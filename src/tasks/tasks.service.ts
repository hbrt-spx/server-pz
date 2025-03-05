import { Injectable } from '@nestjs/common';

import { Task } from '@prisma/client';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  // Busca todas as tarefas
  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  // Busca uma tarefa específica pelo id
  async findOne(taskId: string): Promise<Task | null> {
    return this.taskRepository.findOne(taskId);
  }

  // Cria uma nova tarefa
  async create(data: {
    titulo: string;
    descricao?: string;
    responsavelId: string;
    projetoId: string;
    status: 'EM_ANDAMENTO' | 'CONCLUIDO' | 'PENDENTE'; // Aqui você pode ajustar o enum conforme necessário
  }): Promise<Task> {
    return this.taskRepository.create(data);
  }

  // Deleta uma tarefa
  async delete(id: string): Promise<Task> {
    return this.taskRepository.delete(id);
  }
}
