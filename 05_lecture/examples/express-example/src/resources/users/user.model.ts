import * as uuid from "uuid";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserSerializer } from "./serializers/user.serializer";

const users: UserSerializer[] = [];

class UserModel {
  insertUser(dto: CreateUserDto) {
    const id = uuid.v4();
    const user: UserSerializer = { id, ...dto };

    users.push(user);
    return user;
  }

  findUsers() {
    return users;
  }

  findById(id: string) {
    return users.find((u) => u.id === id);
  }

  updateById(id: string, dto: UpdateUserDto) {
    const userIndex = this.findIndex(id);
    if (userIndex === -1) {
      return null;
    }

    users[userIndex] = {
      ...users[userIndex],
      ...dto,
    };

    return users[userIndex];
  }

  removeById(id: string) {
    const userIndex = this.findIndex(id);
    if (userIndex === -1) {
      return false;
    }

    users.splice(userIndex, 1);
    return true;
  }

  findIndex(id: string) {
    return users.findIndex((u) => u.id === id);
  }
}

export const userModel = new UserModel();
