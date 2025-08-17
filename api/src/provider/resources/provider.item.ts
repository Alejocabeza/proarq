import { addressItem } from '@api/address/resources/address.item';
import { Provider } from '../entities/provider.entity';
import { providerItemCollection } from './provider-item.collection';

export const providerItem = (provider: Provider | null) => {
  if (!provider) return null;
  return {
    id: provider.id,
    name: provider.name,
    email: provider.email,
    phone: provider.phone,
    dni: provider.dni,
    address: provider.address ? addressItem(provider.address) : null,
    items: provider.items ? providerItemCollection(provider.items) : null,
  };
};
