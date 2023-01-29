import { registerAs } from '@nestjs/config';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { validateConfig } from './validate-config';

export class CaptchaConfig {
  @IsBoolean()
  @IsOptional()
  enabled: boolean;

  @IsUrl()
  @IsOptional()
  baseUrl: string;

  @IsString()
  @IsOptional()
  apiSecret: string;

  @IsNumber()
  @IsOptional()
  minScore: number;
}

const configKey = 'captcha';

export const captchaConfig = registerAs(configKey, () => {
  return validateConfig<CaptchaConfig>(configKey, CaptchaConfig, {
    enabled: process.env.CAPTCHA_ENABLED === 'true',
    baseUrl:
      process.env.CAPTCHA_BASE_URL || 'https://www.google.com/recaptcha/api',
    apiSecret: process.env.CAPTCHA_API_SECRET,
    minScore: parseFloat(process.env.CAPTCHA_MIN_SCORE) || 0.5,
  });
});
