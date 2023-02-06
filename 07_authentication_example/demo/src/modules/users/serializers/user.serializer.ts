import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ContactSerializer } from "src/modules/contacts/serializers/contact.serializer";
import { RoleSerializer } from "src/modules/permissions/serializers/role.serializer";

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

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  @Type(() => RoleSerializer)
  roles: RoleSerializer[];
}
