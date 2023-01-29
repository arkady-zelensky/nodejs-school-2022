import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguagesRepository } from './db/languages.repository';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';

@Module({
  imports: [TypeOrmModule.forFeature([LanguagesRepository])],
  controllers: [DictionaryController],
  providers: [DictionaryService],
})
export class DictionaryModule {}
