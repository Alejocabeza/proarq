import { Activity } from '../entities/activity.entity';
import { activityItems } from './activity.items.resource';

export const activityCollection = (activities: Activity[]) =>
  activities.map((activity) => activityItems(activity));
