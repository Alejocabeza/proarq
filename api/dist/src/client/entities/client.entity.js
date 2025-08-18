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
exports.Client = void 0;
const address_entity_1 = require("../../address/entities/address.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const project_entity_1 = require("../../project/entities/project.entity");
const typeorm_1 = require("typeorm");
let Client = class Client {
};
exports.Client = Client;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Client.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 40, nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], Client.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.clients, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], Client.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => address_entity_1.Address, (address) => address.client, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", address_entity_1.Address)
], Client.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, (project) => project.client),
    __metadata("design:type", Array)
], Client.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Client.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Client.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], Client.prototype, "deletedAt", void 0);
exports.Client = Client = __decorate([
    (0, typeorm_1.Entity)('clients')
], Client);
//# sourceMappingURL=client.entity.js.map