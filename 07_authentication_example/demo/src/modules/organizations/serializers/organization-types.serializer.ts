import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OrganizationTypesSerializer {
  @ApiProperty()
  @Expose()
  types: string[];
}
