import { Price } from '../entities/price.entity';

export const priceItem = (price: Price | null) => {
  if (!price) return null;
  return {
    id: price.id,
    name: price.name,
    amount: +price.amount,
  };
};
