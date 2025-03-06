import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsString()
  responsavelId: string;

  @IsString()
  projetoId: string;


  @IsEnum(Status)
  @Transform(({ value }) => value ?? Status.PENDENTE)
  status: Status;
}
