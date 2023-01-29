import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { SettlementSerializer } from 'src/modules/settlements/serializers/settlement.serializer';
import { ContactSerializer } from '../../contacts/serializers/contact.serializer';

export class OrganizationSerializer {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  type: string;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  settlementId: string;

  @ApiProperty()
  @Expose()
  @Type(() => SettlementSerializer)
  settlement: SettlementSerializer;

  @ApiProperty({ type: ContactSerializer, isArray: true })
  @Type(() => ContactSerializer)
  @Expose()
  contacts: ContactSerializer[];
}
