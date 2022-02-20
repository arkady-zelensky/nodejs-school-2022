import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseInterceptor } from 'shared/interceptors/response.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { SingleUserResponseSerializer } from './serializers/single-user-response.serializer';
import { UsersService } from './users.service';

@Controller('/v1/users')
@ApiTags('Users Controller')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(new ResponseInterceptor(SingleUserResponseSerializer))
  @ApiOperation({ summary: 'Create new user' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiCreatedResponse({
    description: 'New user created',
    type: SingleUserResponseSerializer,
  })
  createUser(@Body() dto: CreateUserDto): SingleUserResponseSerializer {
    const user = this.usersService.createUser(dto);
    return { user };
  }
}
