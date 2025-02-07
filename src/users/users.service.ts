// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { User } from '@prisma/client';

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
    return this.userRepository.create(data);
  }
}
