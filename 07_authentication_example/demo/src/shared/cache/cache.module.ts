import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { ConfigService } from '@nestjs/config';

export const cacheModule = CacheModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      store: redisStore,
      isGlobal: true,
      ...configService.get('redis'),
    };
  },
});
