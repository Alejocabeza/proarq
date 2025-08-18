"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContingencyExpenseModule = void 0;
const common_1 = require("@nestjs/common");
const contingency_expense_service_1 = require("./contingency-expense.service");
const contingency_expense_controller_1 = require("./contingency-expense.controller");
const typeorm_1 = require("@nestjs/typeorm");
const contingency_expense_entity_1 = require("./entities/contingency-expense.entity");
const auth_module_1 = require("../auth/auth.module");
let ContingencyExpenseModule = class ContingencyExpenseModule {
};
exports.ContingencyExpenseModule = ContingencyExpenseModule;
exports.ContingencyExpenseModule = ContingencyExpenseModule = __decorate([
    (0, common_1.Module)({
        controllers: [contingency_expense_controller_1.ContingencyExpenseController],
        providers: [contingency_expense_service_1.ContingencyExpenseService],
        imports: [typeorm_1.TypeOrmModule.forFeature([contingency_expense_entity_1.ContingencyExpense]), auth_module_1.AuthModule],
    })
], ContingencyExpenseModule);
//# sourceMappingURL=contingency-expense.module.js.map