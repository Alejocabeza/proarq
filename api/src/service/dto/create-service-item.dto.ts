import { Activity } from '@api/activity/entities/activity.entity';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class createServiceItemDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNumber()
  unitedPrice: number;

  @IsNumber()
  percentage: number;

  @IsNumber()
  activity: Activity;
}
