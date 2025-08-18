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
exports.VatsController = void 0;
const common_1 = require("@nestjs/common");
const vats_service_1 = require("./vats.service");
const create_vat_dto_1 = require("./dto/create-vat.dto");
const update_vat_dto_1 = require("./dto/update-vat.dto");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("../auth/entities/user.entity");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let VatsController = class VatsController {
    constructor(vatsService) {
        this.vatsService = vatsService;
    }
    create(createVatDto, user) {
        return this.vatsService.create(createVatDto, user);
    }
    findAll(user, pagination) {
        return this.vatsService.findAll(user, pagination);
    }
    findOne(id) {
        return this.vatsService.findOne(id);
    }
    update(id, updateVatDto) {
        return this.vatsService.update(id, updateVatDto);
    }
    remove(id) {
        return this.vatsService.remove(id);
    }
};
exports.VatsController = VatsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vat_dto_1.CreateVatDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], VatsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], VatsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VatsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vat_dto_1.UpdateVatDto]),
    __metadata("design:returntype", void 0)
], VatsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VatsController.prototype, "remove", null);
exports.VatsController = VatsController = __decorate([
    (0, common_1.Controller)('vats'),
    __metadata("design:paramtypes", [vats_service_1.VatsService])
], VatsController);
//# sourceMappingURL=vats.controller.js.map