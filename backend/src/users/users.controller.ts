import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ): Promise<User> {
    return this.usersService.createUser(username, password, role);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updates: Partial<User>): Promise<User> {
    return this.usersService.updateUser(id, updates);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}