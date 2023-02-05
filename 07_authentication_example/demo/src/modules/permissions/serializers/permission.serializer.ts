import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Permissions } from "src/shared/permissions/permissions";

export class PermissionSerializer {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: Permissions;
}
