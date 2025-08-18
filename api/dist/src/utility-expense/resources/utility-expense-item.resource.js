"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilityExpenseItem = void 0;
const utilityExpenseItem = (expense) => {
    if (!expense)
        return null;
    return {
        id: expense.id,
        name: expense.name,
        value: expense.value,
    };
};
exports.utilityExpenseItem = utilityExpenseItem;
//# sourceMappingURL=utility-expense-item.resource.js.map