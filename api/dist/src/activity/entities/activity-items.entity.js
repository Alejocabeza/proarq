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
exports.ActivityItem = void 0;
const typeorm_1 = require("typeorm");
const activity_entity_1 = require("./activity.entity");
const provider_entity_1 = require("../../provider/entities/provider.entity");
const provider_item_entity_1 = require("../../provider/entities/provider-item.entity");
const price_entity_1 = require("../../price/entities/price.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
let ActivityItem = class ActivityItem {
};
exports.ActivityItem = ActivityItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ActivityItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], ActivityItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => provider_entity_1.Provider, (provider) => provider.activityItems, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", provider_entity_1.Provider)
], ActivityItem.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => provider_item_entity_1.ProviderItem, (providerItem) => providerItem.activityItems, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", provider_item_entity_1.ProviderItem)
], ActivityItem.prototype, "providerItem", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => activity_entity_1.Activity, (activity) => activity.items, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", activity_entity_1.Activity)
], ActivityItem.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => price_entity_1.Price, (price) => price.activityItems, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", price_entity_1.Price)
], ActivityItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.activityItems, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], ActivityItem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], ActivityItem.prototype, "percentage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ActivityItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ActivityItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], ActivityItem.prototype, "deletedAt", void 0);
exports.ActivityItem = ActivityItem = __decorate([
    (0, typeorm_1.Entity)('activity_items')
], ActivityItem);
//# sourceMappingURL=activity-items.entity.js.map