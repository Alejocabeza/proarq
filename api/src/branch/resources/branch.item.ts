import { addressItem } from '@api/address/resources/address.item';
import { Branch } from '../entities/branch.entity';

export const branchItem = (branch: Branch | null) => {
  if (!branch) return null;
  return {
    id: branch.id,
    name: branch.name,
    email: branch.email,
    phone: branch.phone,
    dni: branch.dni,
    address: branch.address ? addressItem(branch.address) : null,
  };
};
