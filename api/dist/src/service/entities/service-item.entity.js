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
exports.ServiceItem = void 0;
const typeorm_1 = require("typeorm");
const service_entity_1 = require("./service.entity");
const activity_entity_1 = require("../../activity/entities/activity.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
let ServiceItem = class ServiceItem {
};
exports.ServiceItem = ServiceItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ServiceItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, name: 'united_price' }),
    __metadata("design:type", Number)
], ServiceItem.prototype, "unitedPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ServiceItem.prototype, "percentage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.items, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", service_entity_1.Service)
], ServiceItem.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => activity_entity_1.Activity, (activity) => activity.serviceItems, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", activity_entity_1.Activity)
], ServiceItem.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.serviceItems, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], ServiceItem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ServiceItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ServiceItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], ServiceItem.prototype, "deletedAt", void 0);
exports.ServiceItem = ServiceItem = __decorate([
    (0, typeorm_1.Entity)('service_items')
], ServiceItem);
//# sourceMappingURL=service-item.entity.js.map