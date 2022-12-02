import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
  ) {
    return loginDto;
    // return this.authService.validateUser(user.username, user.password);
  }
}
