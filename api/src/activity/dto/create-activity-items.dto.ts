import { Price } from '@api/price/entities/price.entity';
import { ProviderItem } from '@api/provider/entities/provider-item.entity';
import { Provider } from '@api/provider/entities/provider.entity';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateActivityItemsDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  provider: Provider;

  @IsUUID()
  @IsOptional()
  providerItem: ProviderItem;

  @IsUUID()
  price: Price;

  @IsNumber()
  percentage: number;
}
