import { Address } from '../entities/address.entity';

export const addressItem = (address: Address | null) => {
  if (!address) return null;
  return {
    id: address.id,
    name: address.name,
    country: address.country,
    state: address.state,
    city: address.city,
    postalCode: address.postalCode,
    mainAddress: address.mainAddress,
  };
};
