import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const databaseModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return { ...configService.get('database'), logging: true };
  },
});
