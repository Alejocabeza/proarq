import { Price } from '../entities/price.entity';
import { priceItem } from './price.item';

export const priceCollection = (prices: Price[]) =>
  prices.map((price) => priceItem(price));
