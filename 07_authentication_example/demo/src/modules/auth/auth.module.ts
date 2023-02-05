import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { cacheModule } from "src/shared/cache/cache.module";
import { MailingService } from "src/shared/mailing/mailing.service";
import { CaptchaMiddleware } from "src/shared/middlewares/captcha";
import { ContactsRepository } from "../contacts/db/contacts.repository";
import { UsersRepository } from "../users/db/users.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ResetPasswordCodesRepository } from "./reset-password-codes.repository";
import { RevokedTokensRepository } from "./revoked-tokens.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, ContactsRepository]),
    cacheModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MailingService,
    RevokedTokensRepository,
    ResetPasswordCodesRepository,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(CaptchaMiddleware).forRoutes(
    //   { path: 'v1/auth/sign-in', method: RequestMethod.POST },
    //   { path: 'v1/auth/sign-up', method: RequestMethod.POST },
    //   {
    //     path: '/v1/auth/resend-verification-link',
    //     method: RequestMethod.PATCH,
    //   },
    //   { path: '/v1/auth/reset-password', method: RequestMethod.PATCH },
    //   {
    //     path: '/v1/auth/send-reset-password-link',
    //     method: RequestMethod.PATCH,
    //   },
    // );
  }
}
