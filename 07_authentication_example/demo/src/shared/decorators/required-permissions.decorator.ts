import { SetMetadata } from "@nestjs/common";
import {
  Permissions,
  PERMISSIONS_METADATA_LABEL,
} from "../permissions/permissions";

export const RequiredPermissions = (...permissions: Permissions[]) =>
  SetMetadata(PERMISSIONS_METADATA_LABEL, permissions);
