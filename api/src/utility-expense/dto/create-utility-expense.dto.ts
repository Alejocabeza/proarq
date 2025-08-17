import { IsNumber, IsString } from 'class-validator';

export class CreateUtilityExpenseDto {
  @IsString()
  name: string;

  @IsNumber()
  value: number;
}
