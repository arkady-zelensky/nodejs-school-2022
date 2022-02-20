import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSerializer } from './serializers/user.serializer';
import { UserModel } from './user.model';

@Injectable()
export class UsersService {
  constructor(private userModel: UserModel) {}

  createUser(dto: CreateUserDto): UserSerializer {
    return this.userModel.create(dto);
  }
}
