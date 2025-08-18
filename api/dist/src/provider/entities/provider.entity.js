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
exports.Provider = void 0;
const typeorm_1 = require("typeorm");
const provider_item_entity_1 = require("./provider-item.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const address_entity_1 = require("../../address/entities/address.entity");
const activity_items_entity_1 = require("../../activity/entities/activity-items.entity");
let Provider = class Provider {
};
exports.Provider = Provider;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Provider.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Provider.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Provider.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 40, nullable: true }),
    __metadata("design:type", String)
], Provider.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], Provider.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.providers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], Provider.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => address_entity_1.Address, (address) => address.provider, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", address_entity_1.Address)
], Provider.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => provider_item_entity_1.ProviderItem, (item) => item.provider, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Provider.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Provider.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Provider.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], Provider.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activity_items_entity_1.ActivityItem, (activityItem) => activityItem.provider),
    __metadata("design:type", Array)
], Provider.prototype, "activityItems", void 0);
exports.Provider = Provider = __decorate([
    (0, typeorm_1.Entity)('providers')
], Provider);
//# sourceMappingURL=provider.entity.js.map