import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { OrganizationSerializer } from "./organization.serializer";

export class OrganizationsListSerializer {
  @ApiProperty({ type: OrganizationSerializer, isArray: true })
  @Type(() => OrganizationSerializer)
  @Expose()
  organizations: OrganizationSerializer[];
}
