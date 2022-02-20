import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSerializer } from './serializers/user.serializer';
import { v4 } from 'uuid';

const users: UserSerializer[] = [];

@Injectable()
export class UserModel {
  create(createUserDto: CreateUserDto): UserSerializer {
    const user: UserSerializer = {
      id: v4(),
      ...createUserDto,
    };

    users.push(user);

    return user;
  }

  findById(id: string): UserSerializer {
    return users.find(u => u.id === id);
  }

  findAll(): UserSerializer[] {
    return users;
  }

  deleteOne(id: string): boolean {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return false;
    }

    users.splice(userIndex, 1);
    return true;
  }
}
