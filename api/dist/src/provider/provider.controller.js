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
exports.ProviderController = void 0;
const common_1 = require("@nestjs/common");
const provider_service_1 = require("./provider.service");
const create_provider_dto_1 = require("./dto/create-provider.dto");
const update_provider_dto_1 = require("./dto/update-provider.dto");
const passport_1 = require("@nestjs/passport");
const provider_filter_dto_1 = require("./dto/provider-filter.dto");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const user_entity_1 = require("../auth/entities/user.entity");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let ProviderController = class ProviderController {
    constructor(providerService) {
        this.providerService = providerService;
    }
    create(createProviderDto, user) {
        return this.providerService.create(createProviderDto, user);
    }
    findAll(user, pagination) {
        return this.providerService.findAll(user, pagination);
    }
    findAllItems(user, filter) {
        return this.providerService.findAllItems(user, filter);
    }
    findOne(id) {
        return this.providerService.findOne(id);
    }
    update(id, updateProviderDto, user) {
        return this.providerService.update(id, updateProviderDto, user);
    }
    remove(id) {
        return this.providerService.remove(id);
    }
};
exports.ProviderController = ProviderController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_provider_dto_1.CreateProviderDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/items'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, provider_filter_dto_1.ProviderFilterDto]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "findAllItems", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_provider_dto_1.UpdateProviderDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "remove", null);
exports.ProviderController = ProviderController = __decorate([
    (0, common_1.Controller)('providers'),
    __metadata("design:paramtypes", [provider_service_1.ProviderService])
], ProviderController);
//# sourceMappingURL=provider.controller.js.map