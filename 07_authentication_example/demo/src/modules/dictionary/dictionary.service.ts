import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguagesRepository } from './db/languages.repository';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(LanguagesRepository)
    private languagesRepository: LanguagesRepository,
  ) {}

  async getLanguagesList() {
    return this.languagesRepository.find();
  }
}
