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
exports.Address = void 0;
const user_entity_1 = require("../../auth/entities/user.entity");
const branch_entity_1 = require("../../branch/entities/branch.entity");
const client_entity_1 = require("../../client/entities/client.entity");
const project_entity_1 = require("../../project/entities/project.entity");
const provider_entity_1 = require("../../provider/entities/provider.entity");
const typeorm_1 = require("typeorm");
let Address = class Address {
};
exports.Address = Address;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Address.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Address.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, name: 'postal_code' }),
    __metadata("design:type", String)
], Address.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, name: 'main_address' }),
    __metadata("design:type", String)
], Address.prototype, "mainAddress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.addresses, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", String)
], Address.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => client_entity_1.Client, (client) => client.address, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", String)
], Address.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => branch_entity_1.Branch, (branch) => branch.address, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", String)
], Address.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, (project) => project.address, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", String)
], Address.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => provider_entity_1.Provider, (provider) => provider.address, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", String)
], Address.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Address.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Address.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], Address.prototype, "deletedAt", void 0);
exports.Address = Address = __decorate([
    (0, typeorm_1.Entity)('addresses')
], Address);
//# sourceMappingURL=address.entity.js.map