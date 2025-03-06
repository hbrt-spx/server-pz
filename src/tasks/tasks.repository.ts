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


  async create(data: {
    titulo: string;
    descricao?: string;
    responsavelId: string;
    projetoId: string;
    status: Status;  
  }): Promise<Task> {
    return this.prisma.task.create({
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        responsavelId: data.responsavelId,
        projetoId: data.projetoId,
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
