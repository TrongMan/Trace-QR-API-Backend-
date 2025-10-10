// src/user/dto/create-user.dto.ts

import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không đúng định dạng.' })
  email: string;

  @IsString({ message: 'Mật khẩu phải là một chuỗi.' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' })
  password: string;

  @IsString()
  fullName: string;
}