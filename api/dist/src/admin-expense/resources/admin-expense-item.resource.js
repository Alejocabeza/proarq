"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminExpenseItem = void 0;
const adminExpenseItem = (adminExpense) => {
    if (!adminExpense)
        return null;
    return {
        id: adminExpense.id,
        name: adminExpense.name,
        value: adminExpense.value,
    };
};
exports.adminExpenseItem = adminExpenseItem;
//# sourceMappingURL=admin-expense-item.resource.js.map