import { 
  Body, 
  Controller, 
  Post, 
  UnauthorizedException,
  UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';


@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.signIn(signInDto.username, signInDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  // @Post('signout')
  // @UseGuards(AuthGuard('jwt')) // Protect this route with JWT
  // async signOut(@Req() req: any) {
  //   // Invalidate the token (e.g., add it to a blacklist)
  //   await this.authService.invalidateToken(req.user.token);
  //   return { message: 'Signed out successfully' };
  // }
}