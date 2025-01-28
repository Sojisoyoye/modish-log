import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(username: string, password: string, role: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = this.usersRepository.create({ username, password: hashedPassword, role });
    return this.usersRepository.save(user);
  }

  // Find a user by username
  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  // Find a user by ID
  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // Update a user
  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updates);
    return this.usersRepository.save(user);
  }

  // Delete a user
  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  // List all users
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}