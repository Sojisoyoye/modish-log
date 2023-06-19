import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import { User } from 'src/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto) {
    const newUser = await this.userRepository.save(userDto);
    // await this.userRepository.create(userDto);
    // await this.userRepository.save(newUser);
    // console.log('CREated user 222', newUser);

    return newUser;
  }

  async getByUsername(userName: string) {
    const user = await this.userRepository.findOne({
      where: {
        userName,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this user name does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
