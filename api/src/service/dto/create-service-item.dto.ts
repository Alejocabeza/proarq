import { Activity } from '@api/activity/entities/activity.entity';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class createServiceItemDto {
  @IsOptional()
  @IsUUID()
  @IsString()
  id: string;

  @IsNumber()
  unitedPrice: number;

  @IsNumber()
  percentage: number;

  @IsUUID()
  activity: Activity;
}
