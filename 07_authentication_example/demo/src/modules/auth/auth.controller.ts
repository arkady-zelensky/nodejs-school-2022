import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiGoneResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiPreconditionFailedResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ResponseInterceptor } from "src/shared/interceptors/response.interceptor";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { RefreshTokenDto } from "./dto/refresh-tokens.dto";
import { RefreshTokensSerializer } from "./serializers/refresh-tokens.serializer";
import { SignInSerializer } from "./serializers/sign-in.serializer";
import { SignUpDto } from "./dto/sign-up.dto";
import { UserSerializer } from "../users/serializers/user.serializer";
import { UserId } from "src/shared/decorators/user-id.decorators";
import { JwtGuard } from "./guards/jwt.guard";
import { SendResetPasswordLinkDto } from "./dto/send-reset-password-link.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { UserResponseSerializer } from "../users/serializers/user.response.serializer";
import { ResendVerificationLinkDto } from "./dto/resend-verification-link.dto";
import { Send2faCodeDto } from "./dto/send-2fa-code.dto";

@Controller("/v1/auth")
@ApiTags("Auth Controller")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post("sign-up")
  @UseInterceptors(new ResponseInterceptor(UserResponseSerializer))
  @ApiOperation({ summary: "Sign up" })
  @ApiConflictResponse({ description: "User with such email already exists" })
  @ApiCreatedResponse({
    description: "Registration succeeded",
    type: UserResponseSerializer,
  })
  async signUp(@Body() dto: SignUpDto): Promise<UserResponseSerializer> {
    const user = await this.service.signUp(dto);
    return { user };
  }

  @Post("sign-in")
  @UseInterceptors(new ResponseInterceptor(SignInSerializer))
  @ApiOperation({ summary: "Sign in" })
  @ApiNotFoundResponse({ description: "User with such email not found" })
  @ApiForbiddenResponse({ description: "Password is wrong" })
  @ApiPreconditionFailedResponse({ description: "User is not verified" })
  @ApiCreatedResponse({
    description: "Signing in succeeded",
    type: SignInSerializer,
  })
  async signIn(@Body() dto: SignInDto): Promise<SignInSerializer> {
    return this.service.signIn(dto);
  }

  @Post("refresh")
  @UseInterceptors(new ResponseInterceptor(RefreshTokensSerializer))
  @ApiOperation({ summary: "Refresh token pairs" })
  @ApiForbiddenResponse({
    description: " Refresh token is revoked or not valid",
  })
  @ApiCreatedResponse({
    description: "Tokens refresh succeeded",
    type: RefreshTokensSerializer,
  })
  async refreshTokens(
    @Body() dto: RefreshTokenDto
  ): Promise<RefreshTokensSerializer> {
    const tokens = await this.service.refreshTokens(dto);
    return { tokens };
  }

  @Delete("sign-out")
  @HttpCode(204)
  @ApiOperation({ summary: "Sign out" })
  @ApiForbiddenResponse({ description: "Refresh token is not valid" })
  @ApiNoContentResponse({
    description: "Sign out succeeded",
  })
  async signOut(@Body() dto: RefreshTokenDto) {
    return this.service.signOut(dto);
  }

  @Get("current")
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @UseInterceptors(new ResponseInterceptor(UserSerializer))
  @ApiOperation({ summary: "Get current user info" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiOkResponse({
    description: "Current user info returned",
    type: UserSerializer,
  })
  async getCurrentUser(@UserId() userId: string): Promise<UserSerializer> {
    return this.service.getCurrentUser(userId);
  }

  @Patch("/verify/:verificationToken")
  @HttpCode(204)
  @ApiOperation({ summary: "Verify account" })
  @ApiNotFoundResponse({ description: "verification info not found" })
  @ApiNoContentResponse({ description: "Registration succeeded" })
  async verifyEmail(
    @Param("verificationToken") verificationToken: string
  ): Promise<void> {
    return this.service.verifyEmail(verificationToken);
  }

  @Patch("resend-verification-link")
  @HttpCode(204)
  @ApiOperation({
    summary: "Resend verification code for finishing sign-up process",
  })
  @ApiNotFoundResponse({ description: "User with email not found" })
  @ApiNoContentResponse({ description: "Code was resend successfully" })
  async resendVerificationLink(@Body() dto: ResendVerificationLinkDto) {
    return this.service.resendVerificationLink(dto);
  }

  @Patch("send-2fa-code")
  @HttpCode(204)
  @ApiOperation({ summary: "Send 2FA code" })
  @ApiNotFoundResponse({ description: "User with email not found" })
  @ApiNoContentResponse({ description: "Code was resend successfully" })
  async send2faCode(@Body() dto: Send2faCodeDto) {
    return this.service.send2faCode(dto);
  }

  @Patch("send-reset-password-link")
  @HttpCode(204)
  @ApiOperation({
    summary:
      "Send reset password link to email with following structure <baseUrl>/reset-password?code=<code>",
  })
  @ApiForbiddenResponse({ description: "This baseUrl usage is not allowed" })
  @ApiNoContentResponse({
    description:
      "Reset password email send if user with such email exists in our system",
  })
  async sendResetPasswordLink(@Body() dto: SendResetPasswordLinkDto) {
    return this.service.sendResetPasswordLink(dto);
  }

  @Patch("reset-password")
  @HttpCode(204)
  @ApiOperation({ summary: "Reset password with code received in email" })
  @ApiGoneResponse({ description: "Reset password code is wrong or expired" })
  @ApiNotFoundResponse({ description: "User not found (very unlikely)" })
  @ApiNoContentResponse({ description: "Password changed successfully" })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.service.resetPassword(dto);
  }
}
