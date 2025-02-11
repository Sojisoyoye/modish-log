import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from '../enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}