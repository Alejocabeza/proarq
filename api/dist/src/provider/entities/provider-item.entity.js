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
exports.ProviderItem = void 0;
const typeorm_1 = require("typeorm");
const provider_entity_1 = require("./provider.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const activity_items_entity_1 = require("../../activity/entities/activity-items.entity");
let ProviderItem = class ProviderItem {
};
exports.ProviderItem = ProviderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProviderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], ProviderItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProviderItem.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => provider_entity_1.Provider, (provider) => provider.items, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", provider_entity_1.Provider)
], ProviderItem.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.providerItems, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], ProviderItem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProviderItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ProviderItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], ProviderItem.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activity_items_entity_1.ActivityItem, (activityItem) => activityItem.providerItem),
    __metadata("design:type", Array)
], ProviderItem.prototype, "activityItems", void 0);
exports.ProviderItem = ProviderItem = __decorate([
    (0, typeorm_1.Entity)('provider_items')
], ProviderItem);
//# sourceMappingURL=provider-item.entity.js.map