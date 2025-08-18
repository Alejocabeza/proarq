"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminExpenseCollection = void 0;
const admin_expense_item_resource_1 = require("./admin-expense-item.resource");
const adminExpenseCollection = (adminExpenses) => adminExpenses.map((adminExpense) => (0, admin_expense_item_resource_1.adminExpenseItem)(adminExpense));
exports.adminExpenseCollection = adminExpenseCollection;
//# sourceMappingURL=admin-expense-collection.resource.js.map