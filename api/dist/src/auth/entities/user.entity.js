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
exports.User = void 0;
const activity_items_entity_1 = require("../../activity/entities/activity-items.entity");
const activity_entity_1 = require("../../activity/entities/activity.entity");
const address_entity_1 = require("../../address/entities/address.entity");
const branch_entity_1 = require("../../branch/entities/branch.entity");
const client_entity_1 = require("../../client/entities/client.entity");
const employee_entity_1 = require("../../employee/entities/employee.entity");
const price_entity_1 = require("../../price/entities/price.entity");
const project_entity_1 = require("../../project/entities/project.entity");
const provider_item_entity_1 = require("../../provider/entities/provider-item.entity");
const provider_entity_1 = require("../../provider/entities/provider.entity");
const service_category_entity_1 = require("../../service-category/entities/service-category.entity");
const service_item_entity_1 = require("../../service/entities/service-item.entity");
const service_entity_1 = require("../../service/entities/service.entity");
const setting_entity_1 = require("../../setting/entities/setting.entity");
const task_entity_1 = require("../../task/entities/task.entity");
const vat_entity_1 = require("../../vats/entities/vat.entity");
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20, unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, name: 'refresh_token' }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, name: 'reset_paasword_token' }),
    __metadata("design:type", String)
], User.prototype, "resetPasswordToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => address_entity_1.Address, (address) => address.user),
    __metadata("design:type", Array)
], User.prototype, "addresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => client_entity_1.Client, (client) => client.user),
    __metadata("design:type", Array)
], User.prototype, "clients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => branch_entity_1.Branch, (branch) => branch.user),
    __metadata("design:type", Array)
], User.prototype, "branches", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => provider_entity_1.Provider, (provider) => provider.user),
    __metadata("design:type", Array)
], User.prototype, "providers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => provider_item_entity_1.ProviderItem, (providerItem) => providerItem.user),
    __metadata("design:type", Array)
], User.prototype, "providerItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => price_entity_1.Price, (price) => price.user),
    __metadata("design:type", Array)
], User.prototype, "prices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activity_entity_1.Activity, (activity) => activity.user),
    __metadata("design:type", Array)
], User.prototype, "activities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activity_items_entity_1.ActivityItem, (activityItem) => activityItem.user),
    __metadata("design:type", Array)
], User.prototype, "activityItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_category_entity_1.ServiceCategory, (serviceCategory) => serviceCategory.user),
    __metadata("design:type", Array)
], User.prototype, "serviceCategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_entity_1.Service, (service) => service.user),
    __metadata("design:type", Array)
], User.prototype, "services", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_item_entity_1.ServiceItem, (serviceItem) => serviceItem.user),
    __metadata("design:type", Array)
], User.prototype, "serviceItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, (project) => project.user),
    __metadata("design:type", Array)
], User.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.user),
    __metadata("design:type", Array)
], User.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.Employee, (employee) => employee.user),
    __metadata("design:type", Array)
], User.prototype, "employees", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vat_entity_1.Vat, (vat) => vat.user),
    __metadata("design:type", Array)
], User.prototype, "vats", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => setting_entity_1.Setting, (setting) => setting.user),
    __metadata("design:type", setting_entity_1.Setting)
], User.prototype, "setting", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map