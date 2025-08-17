import { IsNumber, IsString } from 'class-validator';

export class CreateVatDto {
  @IsString()
  name: string;

  @IsNumber()
  value: number;
}
