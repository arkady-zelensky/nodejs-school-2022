import { SetMetadata } from "@nestjs/common";
import { PERMISSIONS_METADATA_LABEL } from "../permissions/permissions";

export const RequiredPermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_METADATA_LABEL, permissions);
