import { ContingencyExpense } from '../entities/contingency-expense.entity';
import { contingencyExpenseItem } from './contingency-expense-item.resource';

export const contingencyExpenseCollection = (expenses: ContingencyExpense[]) =>
  expenses.map((expense) => contingencyExpenseItem(expense));
