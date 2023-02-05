import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
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

  @ApiProperty({ type: ContactSerializer, isArray: true })
  @Type(() => ContactSerializer)
  @Expose()
  contacts: ContactSerializer[];
}
