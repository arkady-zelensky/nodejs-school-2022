import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LocationSerializer {
  @ApiProperty()
  @Expose()
  lat: number;

  @ApiProperty()
  @Expose()
  lon: number;
}
