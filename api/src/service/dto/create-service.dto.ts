import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UnitEnum } from '../enum/unit.enum';
import { Type } from 'class-transformer';
import { createServiceItemDto } from './create-service-item.dto';
import { ServiceCategory } from '@api/service-category/entities/service-category.entity';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsEnum(UnitEnum)
  unit: UnitEnum;

  @IsNumber()
  quantity: number;

  @IsUUID()
  serviceCategory: ServiceCategory;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => createServiceItemDto)
  items: createServiceItemDto[];
}
