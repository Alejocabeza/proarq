import { ServiceItem } from '../entities/service-item.entity';

export const serviceItemCollectionResource = (serviceItems: ServiceItem[]) =>
  serviceItems.map((item) => ({
    id: item.id,
    unitedPrice: +item.unitedPrice,
    percentage: +item.percentage,
    activity: {
      id: item.activity.id,
      name: item.activity.name,
    },
  }));
