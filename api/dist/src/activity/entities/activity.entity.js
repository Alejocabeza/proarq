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
exports.Activity = void 0;
const typeorm_1 = require("typeorm");
const activity_items_entity_1 = require("./activity-items.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const service_item_entity_1 = require("../../service/entities/service-item.entity");
let Activity = class Activity {
};
exports.Activity = Activity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Activity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Activity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.activities, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], Activity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activity_items_entity_1.ActivityItem, (activityItem) => activityItem.activity, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Activity.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_item_entity_1.ServiceItem, (serviceItem) => serviceItem.activity),
    __metadata("design:type", Array)
], Activity.prototype, "serviceItems", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        name: 'united_price',
        precision: 10,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Activity.prototype, "unitedPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        name: 'percentage_amount',
        precision: 10,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Activity.prototype, "percentageAmount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Activity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Activity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], Activity.prototype, "deletedAt", void 0);
exports.Activity = Activity = __decorate([
    (0, typeorm_1.Entity)('activities')
], Activity);
//# sourceMappingURL=activity.entity.js.map