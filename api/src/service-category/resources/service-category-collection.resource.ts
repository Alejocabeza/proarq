import { ServiceCategory } from '../entities/service-category.entity';
import { serviceCategoryItem } from './service-category-item.resource';

export const serviceCategoryCollection = (categories: ServiceCategory[]) =>
  categories.map((category) => serviceCategoryItem(category));
