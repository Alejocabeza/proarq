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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const typeorm_2 = require("typeorm");
const employee_collection_resource_1 = require("./resources/employee-collection.resource");
const employee_item_resource_1 = require("./resources/employee-item.resource");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async create(createEmployeeDto, user) {
        try {
            const employee = await this.employeeRepository.create(Object.assign(Object.assign({}, createEmployeeDto), { user: user }));
            await this.employeeRepository.save(employee);
            return {
                message: 'Employee created successfully',
                statusCode: 201,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(user, { limit = 20, offset = 1 }) {
        try {
            const [employees, total] = await this.employeeRepository.findAndCount({
                where: { user: { id: user.id } },
                take: limit,
                skip: (offset - 1) * limit,
                order: { createdAt: 'DESC' },
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, employee_collection_resource_1.employeeCollectionResources)(employees),
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
            const project = await this.employeeRepository.findOneBy({ id });
            return (0, employee_item_resource_1.employeeItemResources)(project);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateEmployeeDto) {
        try {
            await this.employeeRepository.update(id, updateEmployeeDto);
            return {
                message: 'Employee updated successfully.',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            await this.employeeRepository.softDelete(id);
            return {
                message: 'Employee delete successfully.',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map