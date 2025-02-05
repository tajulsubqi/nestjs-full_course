/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Get() //GET
  // findAll() {
  //   return [];
  // }

  @Get() //GET/ users?role=valueGET
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    return this.userService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post()
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: ' INTERN' | 'ADMIN' | 'ENGINEER';
    },
  ) {
    return this.userService.create(user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: {
      name?: string;
      email?: string;
      role?: ' INTERN' | 'ADMIN' | 'ENGINEER';
    },
  ) {
    return this.userService.update(+id, userUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
