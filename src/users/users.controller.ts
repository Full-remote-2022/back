import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";

@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":username")
  async getUser(@Param("username") username: string): Promise<UserDto> {
    const user = await this.usersService.getUser(username);
    return {
      username: user.username,
      id: user.id,
    };
  }

  @Post("signup")
  async createUser(
    @Body() user: CreateUserDto,
  ): Promise<UserDto> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    const result = await this.usersService.createUser(
      user.username,
      hashedPassword,
    );
    return {
      username: result.username,
      id: result.id,
    };
  }
}
