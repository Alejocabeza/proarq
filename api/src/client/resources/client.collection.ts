import { Client } from '../entities/client.entity';
import { clientItem } from './client.item';

export const clientCollection = (clients: Client[]) => {
  return clients.map((client) => clientItem(client));
};
