import { Branch } from '../entities/branch.entity';
import { branchItem } from './branch.item';

export const branchCollection = (branches: Branch[]) => {
  return branches.map((branch) => branchItem(branch));
};
