"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminExpenseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_admin_expense_dto_1 = require("./create-admin-expense.dto");
class UpdateAdminExpenseDto extends (0, mapped_types_1.PartialType)(create_admin_expense_dto_1.CreateAdminExpenseDto) {
}
exports.UpdateAdminExpenseDto = UpdateAdminExpenseDto;
//# sourceMappingURL=update-admin-expense.dto.js.map