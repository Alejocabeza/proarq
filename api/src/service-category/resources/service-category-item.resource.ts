import { ServiceCategory } from '../entities/service-category.entity';

export const serviceCategoryItem = (category: ServiceCategory | null) => {
  if (!category) return null;
  return {
    id: category.id,
    name: category.name,
  };
};
