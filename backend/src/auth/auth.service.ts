import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService, // Inject ConfigService
  ) {}

  async signIn(username: string, password: string): Promise<{ id: number, username: string, role: string, access_token: string }> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, role: user.role };
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'), // Use JWT_SECRET from .env
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'), // Use JWT_EXPIRES_IN from .env
      }),
    };
  }
}