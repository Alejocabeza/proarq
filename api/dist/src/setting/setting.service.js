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
exports.SettingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const setting_entity_1 = require("./entities/setting.entity");
const typeorm_2 = require("typeorm");
const setting_items_resource_1 = require("./resources/setting-items.resource");
let SettingService = class SettingService {
    constructor(settingRepository) {
        this.settingRepository = settingRepository;
    }
    async create(user, res, createSettingDto) {
        try {
            const setting = await this.settingRepository.create(Object.assign(Object.assign({}, createSettingDto), { user }));
            await this.settingRepository.save(setting);
            return {
                message: 'Setting created successfully.',
                statusCode: 201,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(user) {
        try {
            const setting = await this.settingRepository.findOne({
                where: { user: { id: user.id } },
            });
            return (0, setting_items_resource_1.settingItemsResource)(setting);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(user, updateSettingDto) {
        try {
            await this.settingRepository.update({ user }, updateSettingDto);
            return {
                message: 'Setting updated successfully.',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.SettingService = SettingService;
exports.SettingService = SettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(setting_entity_1.Setting)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingService);
//# sourceMappingURL=setting.service.js.map