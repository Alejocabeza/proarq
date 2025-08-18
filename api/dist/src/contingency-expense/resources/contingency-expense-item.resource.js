"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contingencyExpenseItem = void 0;
const contingencyExpenseItem = (expense) => {
    if (!expense)
        return null;
    return {
        id: expense.id,
        name: expense.name,
        value: expense.value,
    };
};
exports.contingencyExpenseItem = contingencyExpenseItem;
//# sourceMappingURL=contingency-expense-item.resource.js.map