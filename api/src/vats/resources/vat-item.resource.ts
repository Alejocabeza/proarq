import { Vat } from '../entities/vat.entity';

export const vatItemResource = (vat: Vat | null) => {
  if (!vat) return null;
  return {
    id: vat.id,
    name: vat.name,
    value: vat.value,
  };
};
