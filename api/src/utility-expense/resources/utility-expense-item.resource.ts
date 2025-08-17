import { UtilityExpense } from '../entities/utility-expense.entity';

export const utilityExpenseItem = (expense: UtilityExpense | null) => {
  if (!expense) return null;
  return {
    id: expense.id,
    name: expense.name,
    value: expense.value,
  };
};
