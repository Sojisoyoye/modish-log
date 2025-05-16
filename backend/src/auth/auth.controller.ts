import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signin.dto";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signin")
  async signIn(@Body() signInDto: SignInDto) {
    try {
      const user = await this.authService.signIn(
        signInDto.username,
        signInDto.password
      );
      if (!user) {
        throw new UnauthorizedException("Invalid credentials");
      }
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error during sign-in: " + error);
      } else {
        throw new Error("Error during sign-in: Unknown error");
      }
    }
  }
}
