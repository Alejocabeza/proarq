import { Provider } from '../entities/provider.entity';
import { providerItem } from './provider.item';

export const providerCollection = (providers: Provider[]) => {
  return providers.map((provider) => providerItem(provider));
};
