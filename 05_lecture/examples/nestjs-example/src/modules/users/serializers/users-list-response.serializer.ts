import { ApiProperty } from '@nestjs/swagger';
import { Type, Expose } from 'class-transformer';
import { UserSerializer } from './user.serializer';

export class UsersListResponseSerializer {
  @ApiProperty({ type: UserSerializer, isArray: true })
  @Expose()
  @Type(() => UserSerializer)
  users: UserSerializer[];
}
