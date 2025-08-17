import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ProviderItemDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  amount: number;
}
