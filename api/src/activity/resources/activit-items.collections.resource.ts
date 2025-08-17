import { ActivityItem } from '../entities/activity-items.entity';

export const activityItemsCollection = (items: ActivityItem[]) =>
  items.map((item) => ({
    id: item.id,
    name: item.name,
    provider: item.provider
      ? {
          id: item.provider.id,
          name: item.provider.name,
        }
      : null,
    providerItem: item.providerItem
      ? {
          id: item.providerItem.id,
          name: item.providerItem.name,
          amount: +item.providerItem.amount,
        }
      : null,
    price: item.price
      ? {
          id: item.price.id,
          name: item.price.name,
          amount: +item.price.amount,
        }
      : null,
    percentage: +item.percentage,
  }));
