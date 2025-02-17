// src/project/project.controller.ts
import { Controller, Post, Body, Get, Param, Req, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from '../projects/projects.service';
import { Project } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly usersService: UsersService
    ) {}
  

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

@UseGuards(JwtAuthGuard)
@Get('user-projects')
async getProjects(@Req() req): Promise<Project[]> {
  const userId = req.user.userId;  // O userId foi atribuído pelo JwtStrategy durante a validação
  return this.projectService.getProjectsByUser(userId);  // Passa o userId para a consulta
}

}
