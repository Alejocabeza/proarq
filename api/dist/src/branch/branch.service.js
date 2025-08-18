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
exports.BranchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const branch_entity_1 = require("./entities/branch.entity");
const typeorm_2 = require("typeorm");
const branch_collection_1 = require("./resources/branch.collection");
const branch_item_1 = require("./resources/branch.item");
let BranchService = class BranchService {
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    async create(createBranchDto, user) {
        try {
            const branch = await this.branchRepository.create(Object.assign(Object.assign({}, createBranchDto), { user }));
            await this.branchRepository.save(branch);
            return {
                message: 'Branch created successfully',
                statusCode: 201,
            };
        }
        catch (error) {
            if (error.code === '23505')
                throw new common_1.BadRequestException(error.detail);
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(user, { limit = 20, offset = 1 }) {
        try {
            const [branches, total] = await this.branchRepository.findAndCount({
                where: { user: { id: user.id } },
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, branch_collection_1.branchCollection)(branches),
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
            const branch = await this.branchRepository.findOne({
                where: { id },
            });
            return (0, branch_item_1.branchItem)(branch);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateBranchDto) {
        try {
            await this.branchRepository.update(id, updateBranchDto);
            return {
                message: 'Branch updated successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    remove(id) {
        try {
            this.branchRepository.softDelete(id);
            return {
                message: 'Branch deleted successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.BranchService = BranchService;
exports.BranchService = BranchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(branch_entity_1.Branch)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BranchService);
//# sourceMappingURL=branch.service.js.map