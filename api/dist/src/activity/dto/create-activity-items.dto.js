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
exports.CreateActivityItemsDto = void 0;
const price_entity_1 = require("../../price/entities/price.entity");
const provider_item_entity_1 = require("../../provider/entities/provider-item.entity");
const provider_entity_1 = require("../../provider/entities/provider.entity");
const class_validator_1 = require("class-validator");
class CreateActivityItemsDto {
}
exports.CreateActivityItemsDto = CreateActivityItemsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateActivityItemsDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActivityItemsDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", provider_entity_1.Provider)
], CreateActivityItemsDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", provider_item_entity_1.ProviderItem)
], CreateActivityItemsDto.prototype, "providerItem", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", price_entity_1.Price)
], CreateActivityItemsDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateActivityItemsDto.prototype, "percentage", void 0);
//# sourceMappingURL=create-activity-items.dto.js.map