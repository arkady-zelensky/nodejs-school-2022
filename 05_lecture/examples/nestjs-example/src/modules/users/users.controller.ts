import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseInterceptor } from 'shared/interceptors/response.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { SingleUserResponseSerializer } from './serializers/single-user-response.serializer';
import { UsersListResponseSerializer } from './serializers/users-list-response.serializer';
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

  @Get()
  @UseInterceptors(new ResponseInterceptor(UsersListResponseSerializer))
  @ApiOperation({ summary: 'Get all user' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiOkResponse({
    description: 'Users returned',
    type: UsersListResponseSerializer,
  })
  getUsers(): UsersListResponseSerializer {
    const users = this.usersService.getUsers();
    return { users };
  }

  @Get(':id')
  @UseInterceptors(new ResponseInterceptor(SingleUserResponseSerializer))
  @ApiOperation({ summary: 'Get user by id' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({
    description: 'User returned',
    type: SingleUserResponseSerializer,
  })
  getUserById(@Param('id') id: string): SingleUserResponseSerializer {
    const user = this.usersService.getUserById(id);
    return { user };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiNoContentResponse({ description: 'User deleted' })
  deleteUser(@Param('id') id: string): void {
    this.usersService.deleteUser(id);
  }
}
