import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { apiConfig } from './api.config';

export const configModule: DynamicModule = ConfigModule.forRoot({
  envFilePath: join(__dirname, '../../.env'),
  isGlobal: true,
  load: [apiConfig],
});
