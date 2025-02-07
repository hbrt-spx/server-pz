// src/project/project.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProjectService } from '../projects/projects.service';
import { Project } from '@prisma/client';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() body: {
    name: string;
    description?: string;
    criadorId: string;
    adminId: string;
  }): Promise<Project> {
    return this.projectService.createProject(body);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project | null> {
    return this.projectService.getProjectById(id);
  }
}
