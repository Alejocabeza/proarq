"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminExpenseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_expense_entity_1 = require("./entities/admin-expense.entity");
const typeorm_2 = require("typeorm");
const admin_expense_collection_resource_1 = require("./resources/admin-expense-collection.resource");
const admin_expense_item_resource_1 = require("./resources/admin-expense-item.resource");
let AdminExpenseService = class AdminExpenseService {
    constructor(adminExpenseRepository) {
        this.adminExpenseRepository = adminExpenseRepository;
    }
    async create(createAdminExpenseDto, user) {
        try {
            const adminExpense = await this.adminExpenseRepository.create(Object.assign(Object.assign({}, createAdminExpenseDto), { user }));
            await this.adminExpenseRepository.save(adminExpense);
            return {
                message: 'Admin expense created successfully',
                statusCode: 201,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll({ limit = 20, offset = 1 }) {
        try {
            const [adminExpenses, total] = await this.adminExpenseRepository.findAndCount({
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, admin_expense_collection_resource_1.adminExpenseCollection)(adminExpenses),
                meta: {
                    total,
                    limit,
                    offset,
                    totalPages,
                    currenPage: offset,
                },
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(id) {
        try {
            const adminExpense = await this.adminExpenseRepository.findOne({
                where: { id },
            });
            return (0, admin_expense_item_resource_1.adminExpenseItem)(adminExpense);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateAdminExpenseDto) {
        try {
            await this.adminExpenseRepository.update(id, updateAdminExpenseDto);
            return {
                message: 'Admin expense updated successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            await this.adminExpenseRepository.softDelete(id);
            return {
                message: 'Admin expense deleted successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.AdminExpenseService = AdminExpenseService;
exports.AdminExpenseService = AdminExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_expense_entity_1.AdminExpense)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminExpenseService);
//# sourceMappingURL=admin-expense.service.js.map