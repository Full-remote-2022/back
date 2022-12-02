import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { UsersService } from "./users.service";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("auth")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":username")
  async getUser(@Param("username") username: string): Promise<User> {
    return this.usersService.getUser({ username });
  }

  @Post("signup")
  async createUser(
    @Body() user: CreateUserDto,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    const result = await this.usersService.createUser(
      user.username,
      hashedPassword,
    );
    return result;
  }
}