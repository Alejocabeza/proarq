"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contingencyExpenseCollection = void 0;
const contingency_expense_item_resource_1 = require("./contingency-expense-item.resource");
const contingencyExpenseCollection = (expenses) => expenses.map((expense) => (0, contingency_expense_item_resource_1.contingencyExpenseItem)(expense));
exports.contingencyExpenseCollection = contingencyExpenseCollection;
//# sourceMappingURL=contingency-expense-collection.resource.js.map