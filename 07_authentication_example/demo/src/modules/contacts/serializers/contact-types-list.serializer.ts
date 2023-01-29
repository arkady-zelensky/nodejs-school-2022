import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ContactTypeSerializer } from './contact-type.serializer';

export class ContactTypesListSerializer {
  @ApiProperty()
  @Type(() => ContactTypeSerializer)
  @Expose()
  types: ContactTypeSerializer[];
}
