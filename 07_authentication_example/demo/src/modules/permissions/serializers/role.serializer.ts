import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { Permissions } from "src/shared/permissions/permissions";
import { PermissionSerializer } from "./permission.serializer";

export class RoleSerializer {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Type(() => PermissionSerializer)
  @Expose()
  permissions: PermissionSerializer[];
}
