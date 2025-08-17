import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @IsOptional()
  offset: number;
}
