import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class TokenSerializer {
  @ApiProperty()
  @Expose()
  token: string;

  @ApiProperty()
  @Expose()
  expiresAt: number;
}

export class TokensSerializer {
  @ApiProperty()
  @Type(() => TokenSerializer)
  @Expose()
  access: TokenSerializer;

  @ApiProperty()
  @Type(() => TokenSerializer)
  @Expose()
  refresh: TokenSerializer;
}
