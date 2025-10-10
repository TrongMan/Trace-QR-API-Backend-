// src/user/user.controller.ts

import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user') // Tất cả các API trong đây sẽ có tiền tố là /user
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post() // Xử lý phương thức POST tới /user
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}