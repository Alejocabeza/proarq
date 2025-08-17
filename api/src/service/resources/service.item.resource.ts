import { Service } from '../entities/service.entity';
import { serviceItemCollectionResource } from './service-item.collection.resource';

export const serviceItemResource = (service: Service | null) => {
  if (!service) return null;
  return {
    id: service.id,
    name: service.name,
    unit: service.unit,
    quantity: service.quantity,
    serviceCategory: {
      id: service.serviceCategory.id,
      name: service.serviceCategory.name,
    },
    items: serviceItemCollectionResource(service.items),
  };
};
