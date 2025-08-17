import { addressItem } from '@api/address/resources/address.item';
import { Client } from '../entities/client.entity';

export const clientItem = (client: Client | null) => {
  if (!client) return null;
  return {
    id: client.id,
    name: client.name,
    email: client.email,
    dni: client.dni,
    phone: client.phone,
    address: client.address ? addressItem(client.address) : null,
  };
};
