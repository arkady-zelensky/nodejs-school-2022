import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ContactTypesRepository } from './db/contact-types.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContactTypesRepository])],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
