import { Expose, Type } from "class-transformer";
import { UserSerializer } from "./user.serializer";

export class SingleUserSerializer {
  @Type(() => UserSerializer)
  @Expose()
  user: UserSerializer;
}
