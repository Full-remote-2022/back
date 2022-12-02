import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

import * as bcrypt from "bcrypt";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.getUser(username);

    if (await bcrypt.compare(pass, user.password)) {
      return user;
    }

    return null;
  }
}
