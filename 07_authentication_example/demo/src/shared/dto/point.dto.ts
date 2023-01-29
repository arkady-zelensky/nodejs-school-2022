import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PointDto {
  @ApiProperty({ name: 'point[lon]', required: false })
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  lon: number;

  @ApiProperty({ name: 'point[lat]', required: false })
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  lat: number;
}
