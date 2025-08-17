import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ProviderItemDto } from './create-provider-item.dto';
import { Address } from '@api/address/entities/address.entity';

export class CreateProviderDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  dni: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsUUID()
  @IsOptional()
  address: Address;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProviderItemDto)
  items: ProviderItemDto[];
}
