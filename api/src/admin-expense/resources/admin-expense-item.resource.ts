import { AdminExpense } from '../entities/admin-expense.entity';

export const adminExpenseItem = (adminExpense: AdminExpense | null) => {
  if (!adminExpense) return null;
  return {
    id: adminExpense.id,
    name: adminExpense.name,
    value: adminExpense.value,
  };
};
