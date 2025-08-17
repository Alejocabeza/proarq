import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  dni: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
