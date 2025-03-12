import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  userId: string;

  @IsString()
  projectId: string;


  @IsEnum(Status)
  @Transform(({ value }) => value ?? Status.PENDENTE)
  status: Status;
}
