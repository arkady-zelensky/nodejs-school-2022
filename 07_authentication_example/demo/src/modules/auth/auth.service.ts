import {
  ConflictException,
  ForbiddenException,
  GoneException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity, UserRelations } from "../users/db/user.entity";
import { UsersRepository } from "../users/db/users.repository";
import { SignInDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcryptjs";
import { GeneralConfig, generalConfig } from "src/config/general.config";
import * as uuid from "uuid";
import * as jwt from "jsonwebtoken";
import { MailingService } from "src/shared/mailing/mailing.service";
import { TokensSerializer } from "./serializers/tokens.serializer";
import { JwtConfig, jwtConfig } from "src/config/jwt.config";
import { JwtPayload, JwtTypes } from "./types/jwt-payload.interface";
import { SignInSerializer } from "./serializers/sign-in.serializer";
import { RefreshTokenDto } from "./dto/refresh-tokens.dto";
import { RevokedTokensRepository } from "./revoked-tokens.repository";
import { SignUpDto } from "./dto/sign-up.dto";
import { SendResetPasswordLinkDto } from "./dto/send-reset-password-link.dto";
import { ResetPasswordCodesRepository } from "./reset-password-codes.repository";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { Permissions } from "src/shared/permissions/permissions";
import { PermissionEntity } from "../permissions/db/permission.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @Inject(generalConfig.KEY)
    private generalConf: GeneralConfig,
    @Inject(jwtConfig.KEY)
    private jwtConf: JwtConfig,
    private mailingService: MailingService,
    private revokedTokensRepository: RevokedTokensRepository,
    private resetPasswordCodesRepository: ResetPasswordCodesRepository
  ) {}

  async signUp(dto: SignUpDto): Promise<UserEntity> {
    const { nickname, email, password } = dto;

    const existingUser = await this.usersRepository.findOne({ email });
    if (existingUser) {
      throw new ConflictException(`User with email '${email}' already exists`);
    }

    return this.usersRepository.save({
      nickname,
      email,
      passwordHash: await this.getPasswordHash(password),
    });
  }

  async signIn(dto: SignInDto): Promise<SignInSerializer> {
    const { email, password } = dto;

    const user = await this.usersRepository.findOne(
      { email },
      { relations: [UserRelations.PERMISSIONS] }
    );
    if (!user) {
      throw new NotFoundException(`User with email '${email}' not found`);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new ForbiddenException("Password is wrong");
    }

    return { user, tokens: this.generateTokens(user.id, [], user.permissions) };
  }

  async refreshTokens(dto: RefreshTokenDto): Promise<TokensSerializer> {
    const payload: JwtPayload = this.verifyRefreshToken(dto.refreshToken);
    const isRevoked = await this.revokedTokensRepository.getRevokedPair(
      payload.pairId
    );
    if (isRevoked) {
      throw new ForbiddenException();
    }

    await this.revokedTokensRepository.setRevokedPair(
      payload.pairId,
      this.getRevokedTokenTtl(payload.exp)
    );

    return this.generateTokens(payload.uid, payload.permissions);
  }

  async signOut(dto: RefreshTokenDto) {
    const payload: JwtPayload = this.verifyRefreshToken(dto.refreshToken);

    await this.revokedTokensRepository.setRevokedPair(
      payload.pairId,
      this.getRevokedTokenTtl(payload.exp)
    );
  }

  async getCurrentUser(userId: string) {
    const user = await this.usersRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async sendResetPasswordLink({ email }: SendResetPasswordLinkDto) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      return;
    }

    const code = uuid.v4();
    await this.resetPasswordCodesRepository.setCode(
      user.id,
      code,
      this.generalConf.resetPasswordCodeExpiresInMinutes * 60
    );

    const resetPasswordLink = `${this.generalConf.resetPasswordBaseUrl}/account/reset-password?code=${code}`;
    await this.mailingService.sendResetPasswordEmail(email, resetPasswordLink);
  }

  async resetPassword(dto: ResetPasswordDto) {
    const userId = await this.resetPasswordCodesRepository.getUserId(dto.code);
    if (!userId) {
      throw new GoneException("Reset password code is wrong or expired");
    }

    const user = await this.usersRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.passwordHash = await this.getPasswordHash(dto.newPassword);
    await this.usersRepository.save(user);
    await this.resetPasswordCodesRepository.deleteCodes(user.id);
  }

  private generateTokens(
    userId: string,
    permissions: Permissions[],
    permissionEntities: PermissionEntity[] = []
  ): TokensSerializer {
    if (permissionEntities.length) {
      permissions.push(...permissionEntities.map((p) => p.name));
    }

    const pairId = uuid.v4();
    const accessPayload: JwtPayload = {
      uid: userId,
      type: JwtTypes.ACCESS,
      pairId,
      permissions,
    };
    const refreshPayload: JwtPayload = {
      uid: userId,
      type: JwtTypes.REFRESH,
      pairId,
      permissions,
    };

    const accessToken = jwt.sign(accessPayload, this.jwtConf.secret, {
      expiresIn: this.jwtConf.accessExpiresIn,
    });
    const refreshToken = jwt.sign(refreshPayload, this.jwtConf.secret, {
      expiresIn: this.jwtConf.refreshExpiresIn,
    });

    return {
      access: {
        token: accessToken,
        expiresAt: (jwt.decode(accessToken) as JwtPayload).exp,
      },
      refresh: {
        token: refreshToken,
        expiresAt: (jwt.decode(refreshToken) as JwtPayload).exp,
      },
    };
  }

  private verifyRefreshToken(refreshToken: string) {
    let payload: JwtPayload;

    try {
      payload = jwt.verify(refreshToken, this.jwtConf.secret) as JwtPayload;
      if (payload.type !== JwtTypes.REFRESH) {
        throw new Error();
      }
    } catch (err) {
      throw new ForbiddenException();
    }

    return payload;
  }

  private getRevokedTokenTtl(exp: number) {
    const now = Math.floor(Date.now() / 1000);
    return exp - now;
  }

  private getPasswordHash(password: string) {
    return bcrypt.hash(password, this.generalConf.bcryptSaltRounds);
  }
}
