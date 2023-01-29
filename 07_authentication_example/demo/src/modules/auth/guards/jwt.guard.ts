import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { JwtConfig, jwtConfig } from 'src/config/jwt.config';
import { JwtPayload, JwtTypes } from '../types/jwt-payload.interface';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConf: JwtConfig,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = (request.headers as any).authorization ?? '';
    const token = authHeader.replace('Bearer ', '');
    (request as any).userId = this.verifyTokenGetUserId(token);

    return true;
  }

  private verifyTokenGetUserId(token: string): string {
    try {
      const { uid, type } = jwt.verify(
        token,
        this.jwtConf.secret,
      ) as JwtPayload;
      if (type !== JwtTypes.ACCESS) {
        throw new UnauthorizedException();
      }

      return uid;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
