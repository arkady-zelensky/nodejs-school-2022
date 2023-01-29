import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AccessModes } from 'src/modules/contacts/types/access-modes.enum';

export class ContactSerializer {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  type: string;

  @ApiProperty()
  @Expose()
  value: string;

  @ApiProperty()
  @Expose()
  verified: boolean;

  @ApiProperty({ enum: AccessModes, enumName: 'AccessModes' })
  @Expose()
  accessMode?: AccessModes;
}
