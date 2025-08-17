import { AdminExpense } from '../entities/admin-expense.entity';
import { adminExpenseItem } from './admin-expense-item.resource';

export const adminExpenseCollection = (adminExpenses: AdminExpense[]) =>
  adminExpenses.map((adminExpense) => adminExpenseItem(adminExpense));
