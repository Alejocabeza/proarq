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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = void 0;
const typeorm_1 = require("typeorm");
const locale_enum_1 = require("../enum/locale.enum");
const coin_enum_1 = require("../enum/coin.enum");
const theme_enum_1 = require("../enum/theme.enum");
const user_entity_1 = require("../../auth/entities/user.entity");
let Setting = class Setting {
};
exports.Setting = Setting;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Setting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: locale_enum_1.LocaleEnum.ES }),
    __metadata("design:type", String)
], Setting.prototype, "locale", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: coin_enum_1.CoinEnum.COP }),
    __metadata("design:type", String)
], Setting.prototype, "coin", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: theme_enum_1.ThemeEnum.LIGHT }),
    __metadata("design:type", String)
], Setting.prototype, "theme", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false, name: 'is_sidebar_collapsed' }),
    __metadata("design:type", Boolean)
], Setting.prototype, "isSidebarCollapsed", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.setting, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Setting.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Setting.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Setting.prototype, "updatedAt", void 0);
exports.Setting = Setting = __decorate([
    (0, typeorm_1.Entity)('settings')
], Setting);
//# sourceMappingURL=setting.entity.js.map