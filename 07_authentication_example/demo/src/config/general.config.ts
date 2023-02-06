import { registerAs } from "@nestjs/config";
import { IsBoolean, IsInt, IsString } from "class-validator";
import { validateConfig } from "./validate-config";

export class GeneralConfig {
  @IsInt()
  port: number;

  @IsBoolean()
  showDocs: boolean;

  @IsInt()
  bcryptSaltRounds: number;

  @IsString()
  serverUrl: string;

  @IsString({ each: true })
  allowedOrigins: string[];

  @IsInt()
  resetPasswordCodeExpiresInMinutes: number;

  @IsInt()
  verificationCodeExpiresInMinutes: number;

  @IsInt()
  twoFaCodeExpiresInMinutes: number;

  @IsString()
  resetPasswordBaseUrl: string;
}

const configKey = "general";

export const generalConfig = registerAs(configKey, () => {
  return validateConfig<GeneralConfig>(configKey, GeneralConfig, {
    port: parseInt(process.env.PORT) || 3000,
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
    showDocs: process.env.SHOW_DOCS === "true",
    serverUrl: process.env.SERVER_URL || "http://localhost:3000",
    allowedOrigins: (process.env.ALLOWED_ORIGIN || "").split(","),
    resetPasswordCodeExpiresInMinutes:
      parseInt(process.env.RESET_PASSWORD_CODE_EXPIRES_IN_MINUTES) || 15,
    twoFaCodeExpiresInMinutes:
      parseInt(process.env.TWO_FA_CODE_EXPIRES_IN_MINUTES) || 15,
    verificationCodeExpiresInMinutes:
      parseInt(process.env.VERIFICATION_CODE_EXPIRES_IN_MINUTES) || 24 * 60,
    resetPasswordBaseUrl:
      process.env.RESET_PASSWORD_BASE_URL || "http://localhost:3000",
  });
});
