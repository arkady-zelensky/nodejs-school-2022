import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { validateConfig } from './validate-config';

export class JwtConfig {
  @IsString()
  secret: string;

  @IsString()
  accessExpiresIn: string;

  @IsString()
  refreshExpiresIn: string;
}

const configKey = 'jwt';

export const jwtConfig = registerAs(configKey, () => {
  return validateConfig<JwtConfig>(configKey, JwtConfig, {
    secret: process.env.JWT_SECRET,
    accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
});
