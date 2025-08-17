export interface ProviderItemsInterface {
  id?: string;
  name: string;
  amount: number;
}

export interface ProviderInterface {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  dni: string;
  address?: string;
  items?: ProviderItemsInterface[];
}
