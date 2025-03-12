import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 100) 
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @IsString()
  @IsNotEmpty()
  adminId: string;
}
