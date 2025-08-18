"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminExpenseModule = void 0;
const common_1 = require("@nestjs/common");
const admin_expense_service_1 = require("./admin-expense.service");
const admin_expense_controller_1 = require("./admin-expense.controller");
const typeorm_1 = require("@nestjs/typeorm");
const admin_expense_entity_1 = require("./entities/admin-expense.entity");
const auth_module_1 = require("../auth/auth.module");
let AdminExpenseModule = class AdminExpenseModule {
};
exports.AdminExpenseModule = AdminExpenseModule;
exports.AdminExpenseModule = AdminExpenseModule = __decorate([
    (0, common_1.Module)({
        controllers: [admin_expense_controller_1.AdminExpenseController],
        providers: [admin_expense_service_1.AdminExpenseService],
        imports: [typeorm_1.TypeOrmModule.forFeature([admin_expense_entity_1.AdminExpense]), auth_module_1.AuthModule],
    })
], AdminExpenseModule);
//# sourceMappingURL=admin-expense.module.js.map