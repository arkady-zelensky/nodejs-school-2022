import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { LanguageSerializer } from './language.serializer';

export class LanguagesListSerializer {
  @ApiProperty({ type: LanguageSerializer, isArray: true })
  @Type(() => LanguageSerializer)
  @Expose()
  languages: LanguageSerializer[];
}
