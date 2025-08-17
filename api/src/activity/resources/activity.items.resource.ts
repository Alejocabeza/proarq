import { Activity } from '../entities/activity.entity';
import { activityItemsCollection } from './activit-items.collections.resource';

export const activityItems = (activity: Activity | null) => {
  if (!activity) return null;
  return {
    id: activity.id,
    name: activity.name,
    items: activityItemsCollection(activity.items),
  };
};
