import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LanguageSerializer {
  @ApiProperty()
  @Expose()
  code: string;

  @ApiProperty()
  @Expose()
  name: string;
}
