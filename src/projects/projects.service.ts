// src/project/project.service.ts
import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../projects/projects.repository';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(data: {
    name: string;
    description?: string;
    criadorId: string;
    adminId: string;
  }): Promise<Project> {
    // Aqui você pode adicionar qualquer lógica de validação ou processamento adicional
    return this.projectRepository.create(data);
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async getProjectById(projectId: string): Promise<Project | null> {
    return this.projectRepository.findOne(projectId);
  }
}
