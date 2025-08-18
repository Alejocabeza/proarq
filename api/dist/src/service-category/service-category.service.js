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
exports.ServiceCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_category_entity_1 = require("./entities/service-category.entity");
const typeorm_2 = require("typeorm");
const service_category_item_resource_1 = require("./resources/service-category-item.resource");
const service_category_collection_resource_1 = require("./resources/service-category-collection.resource");
let ServiceCategoryService = class ServiceCategoryService {
    constructor(serviceCategoryRepository) {
        this.serviceCategoryRepository = serviceCategoryRepository;
    }
    async create(createServiceCategoryDto, user) {
        try {
            const category = await this.serviceCategoryRepository.create(Object.assign(Object.assign({}, createServiceCategoryDto), { user }));
            await this.serviceCategoryRepository.save(category);
            return {
                message: 'Service Category created successfully',
                statusCode: 201,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(user, { limit = 20, offset = 1 }) {
        try {
            const [categories, total] = await this.serviceCategoryRepository.findAndCount({
                where: { user: { id: user.id } },
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, service_category_collection_resource_1.serviceCategoryCollection)(categories),
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
            const category = await this.serviceCategoryRepository.findOne({
                where: { id },
            });
            return (0, service_category_item_resource_1.serviceCategoryItem)(category);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateServiceCategoryDto) {
        try {
            await this.serviceCategoryRepository.update(id, updateServiceCategoryDto);
            return {
                message: 'Service Category updated successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            await this.serviceCategoryRepository.softDelete(id);
            return {
                message: 'Service Category deleted successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.ServiceCategoryService = ServiceCategoryService;
exports.ServiceCategoryService = ServiceCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_category_entity_1.ServiceCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiceCategoryService);
//# sourceMappingURL=service-category.service.js.map