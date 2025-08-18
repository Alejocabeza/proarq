"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilityExpenseCollection = void 0;
const utility_expense_item_resource_1 = require("./utility-expense-item.resource");
const utilityExpenseCollection = (expenses) => expenses.map((expense) => (0, utility_expense_item_resource_1.utilityExpenseItem)(expense));
exports.utilityExpenseCollection = utilityExpenseCollection;
//# sourceMappingURL=utility-expense-collection.resource.js.map