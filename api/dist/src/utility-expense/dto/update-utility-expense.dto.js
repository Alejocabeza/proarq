"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUtilityExpenseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_utility_expense_dto_1 = require("./create-utility-expense.dto");
class UpdateUtilityExpenseDto extends (0, mapped_types_1.PartialType)(create_utility_expense_dto_1.CreateUtilityExpenseDto) {
}
exports.UpdateUtilityExpenseDto = UpdateUtilityExpenseDto;
//# sourceMappingURL=update-utility-expense.dto.js.map