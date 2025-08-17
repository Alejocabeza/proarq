import { IsNumber, IsString } from 'class-validator';

export class CreateContingencyExpenseDto {
  @IsString()
  name: string;

  @IsNumber()
  value: number;
}
