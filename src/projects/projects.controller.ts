import { Controller, Post, Body, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { ProjectService } from '../projects/projects.service';
import { Project } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService
    ) {}
  

  @Post()
  async create(@Body() body: CreateProjectDto): Promise<Project> {
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
  @Get('user-projects/:userId')
  async getProjects(@Param('userId') userId: string): Promise<Project[]> {
    return this.projectService.getProjectsByUser(userId);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string){
    return this.projectService.deleteProjects(id)
  }
}
