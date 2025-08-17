import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateActivityItemsDto } from './create-activity-items.dto';

export class CreateActivityDto {
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateActivityItemsDto)
  items: CreateActivityItemsDto[];
}
