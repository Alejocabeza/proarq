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
exports.ServiceCategoryController = void 0;
const common_1 = require("@nestjs/common");
const service_category_service_1 = require("./service-category.service");
const create_service_category_dto_1 = require("./dto/create-service-category.dto");
const update_service_category_dto_1 = require("./dto/update-service-category.dto");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const user_entity_1 = require("../auth/entities/user.entity");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let ServiceCategoryController = class ServiceCategoryController {
    constructor(serviceCategoryService) {
        this.serviceCategoryService = serviceCategoryService;
    }
    create(createServiceCategoryDto, user) {
        return this.serviceCategoryService.create(createServiceCategoryDto, user);
    }
    findAll(user, pagination) {
        return this.serviceCategoryService.findAll(user, pagination);
    }
    findOne(id) {
        return this.serviceCategoryService.findOne(id);
    }
    update(id, updateServiceCategoryDto) {
        return this.serviceCategoryService.update(id, updateServiceCategoryDto);
    }
    remove(id) {
        return this.serviceCategoryService.remove(id);
    }
};
exports.ServiceCategoryController = ServiceCategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_category_dto_1.CreateServiceCategoryDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ServiceCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ServiceCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_service_category_dto_1.UpdateServiceCategoryDto]),
    __metadata("design:returntype", void 0)
], ServiceCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceCategoryController.prototype, "remove", null);
exports.ServiceCategoryController = ServiceCategoryController = __decorate([
    (0, common_1.Controller)('service_categories'),
    __metadata("design:paramtypes", [service_category_service_1.ServiceCategoryService])
], ServiceCategoryController);
//# sourceMappingURL=service-category.controller.js.map