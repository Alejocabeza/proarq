import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsString()
  mainAddress: string;
}
