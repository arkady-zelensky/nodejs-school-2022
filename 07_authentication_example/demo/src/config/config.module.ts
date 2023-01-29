import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { captchaConfig } from './captcha.config';
import { databaseConfig } from './database.config';
import { entityLocksConfig } from './entity-locks.config';
import { generalConfig } from './general.config';
import { jwtConfig } from './jwt.config';
import { mailingConfig } from './mailing.config';
import { redisConfig } from './redis.config';

export const configModule: DynamicModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [
    databaseConfig,
    generalConfig,
    mailingConfig,
    jwtConfig,
    redisConfig,
    entityLocksConfig,
    captchaConfig,
  ],
});
