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
exports.PriceController = void 0;
const common_1 = require("@nestjs/common");
const price_service_1 = require("./price.service");
const create_price_dto_1 = require("./dto/create-price.dto");
const update_price_dto_1 = require("./dto/update-price.dto");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const user_entity_1 = require("../auth/entities/user.entity");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let PriceController = class PriceController {
    constructor(priceService) {
        this.priceService = priceService;
    }
    create(createPriceDto, user) {
        return this.priceService.create(createPriceDto, user);
    }
    findAll(user, pagination) {
        return this.priceService.findAll(user, pagination);
    }
    findOne(id) {
        return this.priceService.findOne(id);
    }
    update(id, updatePriceDto) {
        return this.priceService.update(id, updatePriceDto);
    }
    remove(id) {
        return this.priceService.remove(id);
    }
};
exports.PriceController = PriceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_price_dto_1.CreatePriceDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PriceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PriceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PriceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_price_dto_1.UpdatePriceDto]),
    __metadata("design:returntype", void 0)
], PriceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PriceController.prototype, "remove", null);
exports.PriceController = PriceController = __decorate([
    (0, common_1.Controller)('prices'),
    __metadata("design:paramtypes", [price_service_1.PriceService])
], PriceController);
//# sourceMappingURL=price.controller.js.map