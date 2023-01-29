import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { TokensSerializer } from './tokens.serializer';

export class RefreshTokensSerializer {
  @ApiProperty()
  @Type(() => TokensSerializer)
  @Expose()
  tokens: TokensSerializer;
}
