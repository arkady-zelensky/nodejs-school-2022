import {
  ConflictException,
  ForbiddenException,
  GoneException,
  Inject,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
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
import { RefreshTokenDto } from "./dto/refresh-tokens.dto";
import { RevokedTokensRepository } from "./revoked-tokens.repository";
import { SignUpDto } from "./dto/sign-up.dto";
import { SendResetPasswordLinkDto } from "./dto/send-reset-password-link.dto";
import { ResetPasswordCodesRepository } from "./reset-password-codes.repository";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { Permissions } from "src/shared/permissions/permissions";
import { RoleEntity } from "../permissions/db/role.entity";
import { VerificationCodesRepository } from "./verification-codes.repository";
import { convertMinutesToSeconds } from "src/shared/utils";
import { ResendVerificationLinkDto } from "./dto/resend-verification-link.dto";
import { TwoFaTypes } from "./types/two-fa-types.enum";
import { TwoFaCodesRepository } from "./two-fa-codes.repository";
import { Send2faCodeDto } from "./dto/send-2fa-code.dto";

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
    private resetPasswordCodesRepository: ResetPasswordCodesRepository,
    private verificationCodesRepository: VerificationCodesRepository,
    private twoFaCodesRepository: TwoFaCodesRepository
  ) {}

  async signUp(dto: SignUpDto): Promise<UserEntity> {
    const { nickname, email, password } = dto;

    const existingUser = await this.usersRepository.findOne({ email });
    if (existingUser) {
      throw new ConflictException(`User with email '${email}' already exists`);
    }

    const user = await this.usersRepository.save({
      nickname,
      email,
      passwordHash: await this.getPasswordHash(password),
    });

    const verificationCode = uuid.v4();
    await this.verificationCodesRepository.setCode(
      user.id,
      verificationCode,
      convertMinutesToSeconds(this.generalConf.verificationCodeExpiresInMinutes)
    );

    await this.sendVerificationLink(user.email, verificationCode);

    return user;
  }

  async signIn(dto: SignInDto) {
    const { email, password } = dto;

    const user = await this.usersRepository.findOne(
      { email },
      { relations: [UserRelations.ROLES, UserRelations.ROLES_PERMISSIONS] }
    );
    if (!user) {
      throw new NotFoundException(`User with email '${email}' not found`);
    }
    if (!user.emailVerified) {
      throw new PreconditionFailedException("You need to verify email first");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new ForbiddenException("Password is wrong");
    }

    if (user.twoFaEnabled) {
      await this.checkTwoFaCode(
        dto.emailTwoFaCode,
        TwoFaTypes.EMAIL_CODE,
        user.id
      );
    }

    return { user, tokens: this.generateTokens(user.id, [], user.roles) };
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

  async verifyEmail(verificationCode: string): Promise<void> {
    const userId = await this.verificationCodesRepository.getUserId(
      verificationCode
    );
    if (!userId) {
      throw new NotFoundException("Verification info not found");
    }

    const user = await this.usersRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException("Verification info not found");
    }

    await this.usersRepository.save({ ...user, emailVerified: true });
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

  async send2faCode(dto: Send2faCodeDto) {
    const user = await this.usersRepository.findOne({ email: dto.email });
    if (!user) {
      // ! Do not throw an error if user with such email does not exist
      return;
    }

    const codeLength = 6;
    let code = Math.floor(Math.random() * 1000000).toString();
    if (code.length < codeLength) {
      const trailingZeros = new Array(codeLength - code.length)
        .fill(0)
        .join("");
      code = trailingZeros + code;
    }

    await this.twoFaCodesRepository.setCode(
      user.id,
      dto.type,
      code,
      convertMinutesToSeconds(this.generalConf.twoFaCodeExpiresInMinutes)
    );

    if (dto.type === TwoFaTypes.EMAIL_CODE) {
      await this.mailingService.sendTwoFaCodeEmail(dto.email, code);
    }
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

  async resendVerificationLink({ email }: ResendVerificationLinkDto) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      // ! Do not throw an error if user with such email does not exist
      return;
    }

    const verificationCode = uuid.v4();
    await this.verificationCodesRepository.setCode(
      user.id,
      verificationCode,
      convertMinutesToSeconds(this.generalConf.verificationCodeExpiresInMinutes)
    );

    await this.sendVerificationLink(email, verificationCode);
  }

  private async sendVerificationLink(
    email: string,
    verificationCode: string
  ): Promise<void> {
    const verificationLink = `${this.generalConf.serverUrl}/account/verification/${verificationCode}`;
    return this.mailingService.sendVerificationEmail(email, verificationLink);
  }

  private generateTokens(
    userId: string,
    permissions: Permissions[],
    roles: RoleEntity[] = []
  ): TokensSerializer {
    if (roles.length) {
      roles.forEach((role) => {
        permissions.push(...role.permissions.map((p) => p.name));
      });
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

  private async checkTwoFaCode(code: string, type: TwoFaTypes, userId: string) {
    const userIdFromCode = await this.twoFaCodesRepository.getUserId(
      type,
      code
    );
    if (userId !== userIdFromCode) {
      throw new GoneException("2FA code does not exist or expired");
    }

    await this.twoFaCodesRepository.deleteCode(userId, type, code);
  }

  private getRevokedTokenTtl(exp: number) {
    const now = Math.floor(Date.now() / 1000);
    return exp - now;
  }

  private getPasswordHash(password: string) {
    return bcrypt.hash(password, this.generalConf.bcryptSaltRounds);
  }
}
