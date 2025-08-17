import { Address } from '../entities/address.entity';
import { addressItem } from './address.item';

export const addressCollection = (addresses: Address[]) => {
  return addresses.map((address) => addressItem(address));
};
