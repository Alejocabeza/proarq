"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityExpenseModule = void 0;
const common_1 = require("@nestjs/common");
const utility_expense_service_1 = require("./utility-expense.service");
const utility_expense_controller_1 = require("./utility-expense.controller");
const typeorm_1 = require("@nestjs/typeorm");
const utility_expense_entity_1 = require("./entities/utility-expense.entity");
const auth_module_1 = require("../auth/auth.module");
let UtilityExpenseModule = class UtilityExpenseModule {
};
exports.UtilityExpenseModule = UtilityExpenseModule;
exports.UtilityExpenseModule = UtilityExpenseModule = __decorate([
    (0, common_1.Module)({
        controllers: [utility_expense_controller_1.UtilityExpenseController],
        providers: [utility_expense_service_1.UtilityExpenseService],
        imports: [typeorm_1.TypeOrmModule.forFeature([utility_expense_entity_1.UtilityExpense]), auth_module_1.AuthModule],
    })
], UtilityExpenseModule);
//# sourceMappingURL=utility-expense.module.js.map