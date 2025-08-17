import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { StatusEnum } from '../enum/status.enum';
import { Project } from '@api/project/entities/project.entity';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsOptional()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate: string;

  @IsString()
  @IsUUID()
  project: Project;

  @IsEnum(StatusEnum)
  status: StatusEnum;
}
