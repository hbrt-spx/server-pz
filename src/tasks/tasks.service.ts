import { Injectable } from '@nestjs/common';
import { Status, Task } from '@prisma/client';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}


  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async findOne(taskId: string): Promise<Task | null> {
    return this.taskRepository.findOne(taskId);
  }

 
  async create(data: {
    titulo: string;
    descricao?: string;
    responsavelId: string;
    projetoId: string;
    status: Status
  }): Promise<Task> {
    return this.taskRepository.create(data);
  }

  async delete(id: string): Promise<Task> {
    return this.taskRepository.delete(id);
  }
}
