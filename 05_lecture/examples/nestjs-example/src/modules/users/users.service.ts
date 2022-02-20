import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSerializer } from './serializers/user.serializer';
import { UserModel } from './user.model';

@Injectable()
export class UsersService {
  constructor(private userModel: UserModel) {}

  createUser(dto: CreateUserDto): UserSerializer {
    return this.userModel.create(dto);
  }

  getUsers(): UserSerializer[] {
    return this.userModel.findAll();
  }

  getUserById(id: string): UserSerializer {
    const user = this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`user not found`);
    }

    return user;
  }

  deleteUser(id: string): void {
    const isDeleted = this.userModel.deleteOne(id);
    if (!isDeleted) {
      throw new NotFoundException(`user not found`);
    }
  }
}
