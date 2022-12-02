import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

import * as bcrypt from "bcrypt";
import { User } from "src/users/users.model";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwfService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.getUser(username);

    if (await bcrypt.compare(pass, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: LoginDto) {
    const payload = { sub: user.username };
    return {
      access_token: this.jwfService.sign(payload),
    };
  }
}
