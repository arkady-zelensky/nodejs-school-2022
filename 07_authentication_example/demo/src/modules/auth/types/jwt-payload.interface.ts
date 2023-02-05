import { Permissions } from "src/shared/permissions/permissions";

export interface JwtPayload {
  uid: string;
  pairId: string;
  permissions: Permissions[];
  type: JwtTypes;
  exp?: number;
}

export enum JwtTypes {
  ACCESS = "access",
  REFRESH = "refresh",
}
