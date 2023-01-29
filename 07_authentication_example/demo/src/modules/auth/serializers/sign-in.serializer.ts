import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserSerializer } from 'src/modules/users/serializers/user.serializer';
import { TokensSerializer } from './tokens.serializer';

export class SignInSerializer {
  @ApiProperty()
  @Type(() => UserSerializer)
  @Expose()
  user: UserSerializer;

  @ApiProperty()
  @Expose()
  tokens: TokensSerializer;
}
