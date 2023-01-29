import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ContactSerializer } from 'src/modules/contacts/serializers/contact.serializer';
import { UserInvolvementSerializer } from 'src/modules/involvements/serializers/user-involvement.serializer';

export class UserSerializer {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  nickname: string;

  @ApiProperty()
  @Type(() => ContactSerializer)
  @Expose()
  contacts: ContactSerializer[] = [];
}
