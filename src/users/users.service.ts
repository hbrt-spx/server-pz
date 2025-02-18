import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findUserById(userId: string): Promise<User | null> {
    return this.userRepository.findOne(userId);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByEmail(email);
  }

  async createUser(data: { name: string; email: string; password: string }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    })

    return user
  }
}
