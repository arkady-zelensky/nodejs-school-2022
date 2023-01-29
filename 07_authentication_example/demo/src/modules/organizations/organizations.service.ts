import * as _ from 'lodash';
import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactsRepository } from '../contacts/db/contacts.repository';
import { OrganizationDto } from './dto/organization.dto';
import { OrganizationTypesRepository } from './db/organization-types.repository';
import { OrganizationsRepository } from './db/organizations.repository';
import { GetHubsListDto } from './dto/get-hubs-list.dto';
import {
  EntityLocksConfig,
  entityLocksConfig,
} from 'src/config/entity-locks.config';
import { OrganizationRelations } from './types/organization-relations.enum';
import { OrganizationStatuses } from './types/organization-statuses.enum';
import { ContactEntity } from '../contacts/db/contact.entity';
import { AccessModes } from '../contacts/types/access-modes.enum';
import { AccessTypes } from '../contacts/types/access-types.enum';
import { OrganizationsSearchParams } from './types/hubs-search-params.interface';
import { SettlementsRepository } from '../settlements/db/settlements.repository';
import {
  HubsBySettlementsCount as SettlementWithHubsCount,
  HubsCountBySettlementId,
} from './types/hubs-by-settlements-count.class';
import { OrganizationTypes } from './types/organization-types.enum';
import { RideEntity } from '../rides/db/ride.entity';
import { RidesRepository } from '../rides/db/rides.repository';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationsRepository)
    private organizationsRepository: OrganizationsRepository,
    @InjectRepository(OrganizationTypesRepository)
    private organizationTypesRepository: OrganizationTypesRepository,
    @InjectRepository(ContactsRepository)
    private contactsRepository: ContactsRepository,
    @InjectRepository(SettlementsRepository)
    private settlementsRepository: SettlementsRepository,
    @InjectRepository(RidesRepository)
    private ridesRepository: RidesRepository,
    @Inject(entityLocksConfig.KEY)
    private entityLocksConf: EntityLocksConfig,
  ) {}

  async createOrganization(
    creatorId: string,
    dto: OrganizationDto,
    language: string,
  ) {
    const alreadyOwnedOrganization = await this.organizationsRepository.findOne(
      { createdBy: creatorId, type: dto.type },
    );
    if (alreadyOwnedOrganization) {
      throw new ConflictException('You already own an organization');
    }

    const organizationCreated = await this.organizationsRepository.save({
      ...dto,
      status: OrganizationStatuses.CREATED,
      createdBy: creatorId,
    });

    return this.organizationsRepository.findOrganizationById(
      organizationCreated.id,
      language,
      creatorId,
      [OrganizationRelations.SETTLEMENT, OrganizationRelations.CONTACTS],
    );
  }

  async getOrganizationTypes(): Promise<string[]> {
    const types = await this.organizationTypesRepository.find();
    return types.map((t) => t.type);
  }

  async updateOrganization(
    id: string,
    userId: string,
    dto: OrganizationDto,
    language: string,
  ) {
    const organization = await this.organizationsRepository.findOne(id);
    if (!organization) {
      throw new NotFoundException(`Organization with id '${id}'  not found`);
    }
    if (organization.createdBy !== userId) {
      throw new ForbiddenException('Action is not allowed');
    }

    const organizationUpdated = await this.organizationsRepository.save({
      ...organization,
      ...dto,
    });
    await this.contactsRepository.removeMissingContacts(
      organizationUpdated,
      'organizationId',
    );

    return this.organizationsRepository.findOrganizationById(
      organizationUpdated.id,
      language,
      userId,
      [OrganizationRelations.SETTLEMENT, OrganizationRelations.CONTACTS],
    );
  }

  async getHubsList(dto: GetHubsListDto, userId: string, language: string) {
    let ride: RideEntity;
    if (dto.rideId) {
      ride = await this.ridesRepository.findOne(dto.rideId);
    }

    const searchParams: OrganizationsSearchParams = {
      search: dto.search,
      point: dto.point,
      language,
      radius: dto.radiusInKm * 1000,
      userId,
      ride,
      relations: [
        OrganizationRelations.CONTACTS,
        OrganizationRelations.CONTACT_ACCESS,
        OrganizationRelations.SETTLEMENT,
      ],
      types: [OrganizationTypes.HUB, OrganizationTypes.MOBILE_HUB],
    };

    const hubsCountBySettlementId =
      await this.organizationsRepository.countOrganizationsBySettlements(
        searchParams,
      );
    const totalHubsCount = _.sumBy(hubsCountBySettlementId, (h) => h.hubsCount);
    if (
      totalHubsCount > this.entityLocksConf.maxHubsSearchEntitiesToReturn ||
      dto.onlyCountDebugRun
    ) {
      const settlementsWithHubsCount =
        await this.prepareSettlementsWithHubsCount(
          hubsCountBySettlementId,
          language,
        );
      return { settlementsWithHubsCount };
    }

    const organizations =
      await this.organizationsRepository.findOrganizationsList(searchParams);

    return {
      organizations: organizations.map((o) => {
        o.contacts = this.prepareContacts(o.contacts, userId, o.createdBy);
        return o;
      }),
    };
  }

  async getMyOrganizationsList(userId: string, language: string) {
    return this.organizationsRepository.findOrganizationsList({
      language,
      userId,
      relations: [
        OrganizationRelations.CONTACTS,
        OrganizationRelations.SETTLEMENT,
      ],
      isUserOwner: true,
    });
  }

  prepareContacts(
    contacts: ContactEntity[],
    userId: string,
    createdBy: string,
  ) {
    if (userId === createdBy) {
      return contacts;
    }

    return contacts.map((c) => {
      if (c.accessMode === AccessModes.PUBLIC) {
        return c;
      }

      const userHasAccess = c.accesses.some(
        (a) => a.userId === userId && a.type === AccessTypes.READ,
      );
      if (c.accessMode === AccessModes.READ_BY_REQUEST && userHasAccess) {
        return c;
      }

      c.value = '*******';
      delete c.accessMode;
      return c;
    });
  }

  private async prepareSettlementsWithHubsCount(
    hubsCountBySettlementId: HubsCountBySettlementId[],
    language: string,
  ): Promise<SettlementWithHubsCount[]> {
    const settlementsIds = hubsCountBySettlementId.reduce(
      (ids, e) => ids.concat(e.settlementId),
      [] as string[],
    );
    const settlements = await this.settlementsRepository.getSettlementByIds(
      settlementsIds,
      language,
    );
    return settlements.map((s) => ({
      ...s,
      hubsCount: hubsCountBySettlementId.find((c) => c.settlementId === s.id)
        ?.hubsCount,
    }));
  }
}
