import { UtilityExpense } from '../entities/utility-expense.entity';
import { utilityExpenseItem } from './utility-expense-item.resource';

export const utilityExpenseCollection = (expenses: UtilityExpense[]) =>
  expenses.map((expense) => utilityExpenseItem(expense));
