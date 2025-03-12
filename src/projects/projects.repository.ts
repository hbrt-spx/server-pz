import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findOne(projectId: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id: projectId },
    });
  }

  async getProjectsByUser(userId: string): Promise<Project[]> {
  return this.prisma.project.findMany({
    where: {
      OR: [
        { creatorId: userId },
        { adminId: userId }
      ],
    },
  });
}


  async create(data: {
    name: string;
    description?: string;
    creatorId: string;
    adminId: string;
  }): Promise<Project> {
    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        creatorId: data.creatorId,
        adminId: data.adminId,
      },
    });
  }

  async delete(id: string){
    return this.prisma.project.delete({
      where: {
        id: id
      }
    })
  }
}
