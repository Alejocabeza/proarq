import { ProviderItem } from '../entities/provider-item.entity';

export const providerItemCollection = (providerItem: ProviderItem[]) =>
  providerItem.map((providerItem) => ({
    id: providerItem.id,
    name: providerItem.name,
    amount: +providerItem.amount,
  }));
