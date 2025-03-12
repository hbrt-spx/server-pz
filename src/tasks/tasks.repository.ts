import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task, Status } from '@prisma/client';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findOne(taskId: string): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id: taskId },
    });
  }

  async getTasksByProject(projectId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { projectId: projectId },     
    });
  }


  async create(data: {
    title: string;
    description?: string;
    userId: string;
    projectId: string;
    status: Status;  
  }): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        userId: data.userId,
        projectId: data.projectId,
        status: data.status, 
      },
    });
  }

  async delete(id: string) {
    return this.prisma.task.delete({
      where: {
        id: id,
      },
    });
  }
}
