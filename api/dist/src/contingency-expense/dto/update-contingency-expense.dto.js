"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContingencyExpenseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_contingency_expense_dto_1 = require("./create-contingency-expense.dto");
class UpdateContingencyExpenseDto extends (0, mapped_types_1.PartialType)(create_contingency_expense_dto_1.CreateContingencyExpenseDto) {
}
exports.UpdateContingencyExpenseDto = UpdateContingencyExpenseDto;
//# sourceMappingURL=update-contingency-expense.dto.js.map