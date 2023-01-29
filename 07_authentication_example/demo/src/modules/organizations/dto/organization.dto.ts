import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ContactDto } from '../../contacts/dto/contact.dto';
import { OrganizationTypes } from '../types/organization-types.enum';

export class OrganizationDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: OrganizationTypes;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  address = '';

  @ApiProperty()
  @IsUUID()
  settlementId: string;

  @ApiProperty({ type: ContactDto, isArray: true })
  @Type(() => ContactDto)
  @ValidateNested({ each: true })
  contacts: ContactDto[];
}
