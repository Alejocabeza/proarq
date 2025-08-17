import { ContingencyExpense } from '../entities/contingency-expense.entity';

export const contingencyExpenseItem = (expense: ContingencyExpense | null) => {
  if (!expense) return null;
  return {
    id: expense.id,
    name: expense.name,
    value: expense.value,
  };
};
