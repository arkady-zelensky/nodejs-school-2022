import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserSerializer } from './user.serializer';

export class SingleUserResponseSerializer {
  @ApiProperty()
  @Expose()
  @Type(() => UserSerializer)
  user: UserSerializer;
}
