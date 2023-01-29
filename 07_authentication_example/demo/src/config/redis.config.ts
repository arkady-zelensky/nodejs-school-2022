import { registerAs } from '@nestjs/config';
import { IsInt, IsString } from 'class-validator';
import { validateConfig } from './validate-config';

export class RedisConfig {
  @IsString()
  host: string;

  @IsInt()
  port: number;

  @IsInt()
  db: number;
}

const configKey = 'redis';

export const redisConfig = registerAs(configKey, () => {
  return validateConfig<RedisConfig>(configKey, RedisConfig, {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    db: parseInt(process.env.REDIS_DB),
  });
});
