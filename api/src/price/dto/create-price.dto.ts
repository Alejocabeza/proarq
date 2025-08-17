import { IsNumber, IsString } from 'class-validator';

export class CreatePriceDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;
}
