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
exports.ContingencyExpenseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contingency_expense_entity_1 = require("./entities/contingency-expense.entity");
const typeorm_2 = require("typeorm");
const contingency_expense_collection_resource_1 = require("./resources/contingency-expense-collection.resource");
const contingency_expense_item_resource_1 = require("./resources/contingency-expense-item.resource");
let ContingencyExpenseService = class ContingencyExpenseService {
    constructor(contingencyExpenseRepository) {
        this.contingencyExpenseRepository = contingencyExpenseRepository;
    }
    async create(createContingencyExpenseDto, user) {
        try {
            const expense = await this.contingencyExpenseRepository.create(Object.assign(Object.assign({}, createContingencyExpenseDto), { user }));
            await this.contingencyExpenseRepository.save(expense);
            return {
                message: 'Contingency expense created successfully',
                statusCode: 201,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll({ limit = 20, offset = 1 }) {
        try {
            const [expenses, total] = await this.contingencyExpenseRepository.findAndCount({
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, contingency_expense_collection_resource_1.contingencyExpenseCollection)(expenses),
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
            const expense = await this.contingencyExpenseRepository.findOne({
                where: { id },
            });
            return (0, contingency_expense_item_resource_1.contingencyExpenseItem)(expense);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateContingencyExpenseDto) {
        try {
            await this.contingencyExpenseRepository.update(id, updateContingencyExpenseDto);
            return {
                message: 'Contingency expense updated successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            await this.contingencyExpenseRepository.softDelete(id);
            return {
                message: 'Contingency expense deleted successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.ContingencyExpenseService = ContingencyExpenseService;
exports.ContingencyExpenseService = ContingencyExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contingency_expense_entity_1.ContingencyExpense)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContingencyExpenseService);
//# sourceMappingURL=contingency-expense.service.js.map