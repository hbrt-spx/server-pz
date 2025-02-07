// src/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';  // Importando o PrismaService
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}  // Injeção do PrismaService

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();  // Usando prisma do PrismaService
  }

  async findOne(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: { name: string; email: string; password: string; confirm?: string }): Promise<User> {
    const { confirm: _, ...userData } = data;
    return this.prisma.user.create({
      data: {
        ...userData,
      },
    });
  }
}
