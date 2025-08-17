import { PaginationDto } from '@api/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class ProviderFilterDto extends PaginationDto {
  @IsString()
  @IsOptional()
  provider: string;
}
