import { Expose, Type } from "class-transformer";
import { UserSerializer } from "./user.serializer";

export class UsersListSerializer {
  @Type(() => UserSerializer)
  @Expose()
  users: UserSerializer[];
}
