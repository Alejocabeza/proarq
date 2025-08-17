import { IsNumber, IsString } from 'class-validator';

export class CreateAdminExpenseDto {
  @IsString()
  name: string;

  @IsNumber()
  value: number;
}
