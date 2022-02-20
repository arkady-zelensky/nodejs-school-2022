import * as convict from 'convict';
import { registerAs } from '@nestjs/config';

export interface ApiConfig {
  env: string;
  port: number;
  showDocs: boolean;
}

export const apiConfig = registerAs(
  'api',
  (): ApiConfig => {
    return convict({
      env: {
        doc: 'Environment name',
        format: String,
        default: 'production',
        env: 'NODE_ENV',
      },
      port: {
        doc: 'Port to listen',
        format: Number,
        default: 3000,
        env: 'PORT',
      },
      showDocs: {
        doc: 'Should show Swagger docs',
        format: Boolean,
        default: false,
        env: 'SHOW_DOCS',
      },
    })
      .validate()
      .getProperties();
  },
);
