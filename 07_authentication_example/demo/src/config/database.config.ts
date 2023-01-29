import { registerAs } from '@nestjs/config';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { join } from 'path';
import { validateConfig } from './validate-config';

export class DatabaseCliConfig {
  @IsString()
  migrationsDir = '';
}

export class DatabaseConfig {
  @IsString()
  type = 'postgres';

  @IsString()
  url: string;

  @ValidateNested()
  @Type(() => DatabaseCliConfig)
  cli?: DatabaseCliConfig;

  @IsString({ each: true })
  entities!: string[];

  @IsString({ each: true })
  migrations!: string[];
}

const configKey = 'database';

export const databaseConfig = registerAs(configKey, () => {
  return validateConfig<DatabaseConfig>(configKey, DatabaseConfig, {
    type: process.env.DATABASE_TYPE || 'postgres',
    url:
      process.env.NODE_ENV === 'test'
        ? process.env.TEST_DB_URL
        : process.env.DB_URL,
    cli: {
      migrationsDir: join(__dirname, '../database/migrations'),
    },
    migrations: [`${join(__dirname, '../database/migrations')}/**/*.{js,ts}`],
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  });
});
