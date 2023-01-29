import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { AccessModes } from '../types/access-modes.enum';

export class ContactDto {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({ enum: AccessModes, enumName: 'AccessModes' })
  @IsEnum(AccessModes)
  accessMode: AccessModes;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  value: string;
}
