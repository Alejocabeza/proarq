import { Service } from '../entities/service.entity';
import { serviceItemResource } from './service.item.resource';

export const serviceCollectionResource = (services: Service[]) =>
  services.map((service) => serviceItemResource(service));
