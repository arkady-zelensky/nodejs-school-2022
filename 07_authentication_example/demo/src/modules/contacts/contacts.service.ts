import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactTypesRepository } from './db/contact-types.repository';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactTypesRepository)
    private contactTypesRepository: ContactTypesRepository,
  ) {}

  async getContactTypes(language: string) {
    return this.contactTypesRepository.findContactTypes(language);
  }
}
