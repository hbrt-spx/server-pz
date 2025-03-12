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

  async getTasksByProject(projectId: string): Promise<Task[]> {
    console.log('Id Projeto', projectId)
    return this.taskRepository.getTasksByProject(projectId);
  }

 
  async create(data: {
    title: string;
    description?: string;
    userId: string;
    projectId: string;
    status: Status
  }): Promise<Task> {
    return this.taskRepository.create(data);
  }

  async delete(id: string): Promise<Task> {
    return this.taskRepository.delete(id);
  }
}
