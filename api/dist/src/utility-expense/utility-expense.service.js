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
exports.UtilityExpenseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const utility_expense_entity_1 = require("./entities/utility-expense.entity");
const typeorm_2 = require("typeorm");
const utility_expense_collection_resource_1 = require("./resources/utility-expense-collection.resource");
const utility_expense_item_resource_1 = require("./resources/utility-expense-item.resource");
let UtilityExpenseService = class UtilityExpenseService {
    constructor(utilityExpenseRepository) {
        this.utilityExpenseRepository = utilityExpenseRepository;
    }
    async create(createUtilityExpenseDto, user) {
        try {
            const expense = await this.utilityExpenseRepository.create(Object.assign(Object.assign({}, createUtilityExpenseDto), { user }));
            await this.utilityExpenseRepository.save(expense);
            return {
                message: 'Utility expense created successfully',
                statusCode: 201,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll({ limit = 20, offset = 1 }) {
        try {
            const [expenses, total] = await this.utilityExpenseRepository.findAndCount({
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, utility_expense_collection_resource_1.utilityExpenseCollection)(expenses),
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
            const expense = await this.utilityExpenseRepository.findOne({
                where: { id },
            });
            return (0, utility_expense_item_resource_1.utilityExpenseItem)(expense);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateUtilityExpenseDto) {
        try {
            await this.utilityExpenseRepository.update(id, updateUtilityExpenseDto);
            return {
                message: 'Utility expense updated successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            await this.utilityExpenseRepository.softDelete(id);
            return {
                message: 'Utility expense deleted successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.UtilityExpenseService = UtilityExpenseService;
exports.UtilityExpenseService = UtilityExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(utility_expense_entity_1.UtilityExpense)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UtilityExpenseService);
//# sourceMappingURL=utility-expense.service.js.map