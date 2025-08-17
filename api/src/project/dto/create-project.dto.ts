import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TypeClientEnum } from '../enum/type-client.enum';
import { Branch } from '@api/branch/entities/branch.entity';
import { Client } from '@api/client/entities/client.entity';
import { Address } from '@api/address/entities/address.entity';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsOptional()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate: string;

  @IsEnum(TypeClientEnum)
  typeClient: TypeClientEnum;

  @IsString()
  @IsUUID()
  @IsOptional()
  branch: Branch;

  @IsString()
  @IsUUID()
  @IsOptional()
  client: Client;

  @IsString()
  @IsUUID()
  @IsOptional()
  address: Address;
}
