import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsRepository } from '../contacts/db/contacts.repository';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { OrganizationTypesRepository } from './db/organization-types.repository';
import { OrganizationsRepository } from './db/organizations.repository';
import { HubsController } from './hubs.controller';
import { SettlementsRepository } from '../settlements/db/settlements.repository';
import { RidesRepository } from '../rides/db/rides.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrganizationsRepository,
      OrganizationTypesRepository,
      ContactsRepository,
      SettlementsRepository,
      RidesRepository,
    ]),
  ],
  controllers: [OrganizationsController, HubsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
