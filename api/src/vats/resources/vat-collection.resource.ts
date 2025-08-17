import { Vat } from '../entities/vat.entity';
import { vatItemResource } from './vat-item.resource';

export const vatCollectionResource = (vats: Vat[]) =>
  vats.map((vat) => vatItemResource(vat));
