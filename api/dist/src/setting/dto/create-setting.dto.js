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
exports.CreateSettingDto = void 0;
const class_validator_1 = require("class-validator");
const locale_enum_1 = require("../enum/locale.enum");
const coin_enum_1 = require("../enum/coin.enum");
const theme_enum_1 = require("../enum/theme.enum");
class CreateSettingDto {
}
exports.CreateSettingDto = CreateSettingDto;
__decorate([
    (0, class_validator_1.IsEnum)(locale_enum_1.LocaleEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSettingDto.prototype, "locale", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(locale_enum_1.LocaleEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSettingDto.prototype, "coin", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(theme_enum_1.ThemeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSettingDto.prototype, "theme", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSettingDto.prototype, "isSidebarCollapsed", void 0);
//# sourceMappingURL=create-setting.dto.js.map