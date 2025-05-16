import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { AuthGuard } from "@nestjs/passport";
import { UserRole } from "./enum";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "./roles.guard";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("api/users")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.Admin)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: number,
    @Body() updates: Partial<User>
  ): Promise<User> {
    return this.usersService.updateUser(id, updates);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
