export interface JwtPayload {
  uid: string;
  pairId: string;
  type: JwtTypes;
  exp?: number;
}

export enum JwtTypes {
  ACCESS = 'access',
  REFRESH = 'refresh',
}
