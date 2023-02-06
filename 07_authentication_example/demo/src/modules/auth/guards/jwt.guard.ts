import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { Observable } from "rxjs";
import { JwtConfig, jwtConfig } from "src/config/jwt.config";
import {
  Permissions,
  PERMISSIONS_METADATA_LABEL,
} from "src/shared/permissions/permissions";
import { JwtPayload, JwtTypes } from "../types/jwt-payload.interface";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConf: JwtConfig,
    private reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = (request.headers as any).authorization ?? "";
    const token = authHeader.replace("Bearer ", "");

    const payload = this.verifyToken(token);
    this.checkPermissions(context, payload.permissions);

    (request as any).userId = payload.uid;

    return true;
  }

  private verifyToken(token: string): JwtPayload {
    try {
      const payload = jwt.verify(token, this.jwtConf.secret) as JwtPayload;
      if (payload.type !== JwtTypes.ACCESS) {
        throw new UnauthorizedException();
      }

      return payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private checkPermissions(
    context: ExecutionContext,
    permissions: Permissions[]
  ) {
    const requiredPermissions =
      this.reflector.get<Permissions[]>(
        PERMISSIONS_METADATA_LABEL,
        context.getHandler()
      ) || [];

    requiredPermissions.forEach((perm) => {
      if (!permissions.includes(perm)) {
        throw new ForbiddenException("User does not have enough permissions");
      }
    });
  }
}
