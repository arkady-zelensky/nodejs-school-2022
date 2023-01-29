import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { SettlementsWithHubsCountSerializer } from './hubs-count-by-settlement.serializer';
import { OrganizationSerializer } from './organization.serializer';

export class OrganizationsListSerializer {
  @ApiProperty({ type: OrganizationSerializer, isArray: true })
  @Type(() => OrganizationSerializer)
  @Expose()
  organizations: OrganizationSerializer[];

  @ApiProperty({ type: SettlementsWithHubsCountSerializer, isArray: true })
  @Type(() => SettlementsWithHubsCountSerializer)
  @Expose()
  settlementsWithHubsCount: SettlementsWithHubsCountSerializer;
}
