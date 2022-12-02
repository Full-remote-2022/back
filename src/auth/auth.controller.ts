import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
    // return this.authService.validateUser(user.username, user.password);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("ping")
  @ApiBearerAuth()
  async ping() {
    return "pong, you are authenticated";
  }
}
