import { Module } from '@nestjs/common';
import { configModule } from './config/config.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [configModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
