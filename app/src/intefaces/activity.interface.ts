import { PriceInterface } from "./price.interface";
import {
  ProviderInterface,
  ProviderItemsInterface,
} from "./provider.interface";

export interface ActivityItemsInterface {
  id?: string;
  name: string;
  percentage: number;
  provider?: ProviderInterface | null;
  providerItem?: ProviderItemsInterface | null;
  price: PriceInterface | null;
}

export interface ActivityInterface {
  id?: string;
  name: string;
  unitedPrice?: number;
  percentage?: number;
  items?: ActivityItemsInterface[];
}
