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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_entity_1 = require("./entities/service.entity");
const typeorm_2 = require("typeorm");
const service_item_entity_1 = require("./entities/service-item.entity");
const service_collection_resource_1 = require("./resources/service.collection.resource");
const service_item_resource_1 = require("./resources/service.item.resource");
let ServiceService = class ServiceService {
    constructor(serviceRepository, serviceItemRepository) {
        this.serviceRepository = serviceRepository;
        this.serviceItemRepository = serviceItemRepository;
    }
    async create(createServiceDto, user) {
        try {
            const { items } = createServiceDto, rest = __rest(createServiceDto, ["items"]);
            const service = this.serviceRepository.create(Object.assign(Object.assign({}, rest), { user }));
            await this.serviceRepository.save(service);
            if (items && items.length > 0) {
                const serviceItems = items.map((item) => this.serviceItemRepository.create(Object.assign(Object.assign({}, item), { service,
                    user })));
                await this.serviceItemRepository.save(serviceItems);
            }
            return {
                message: 'Service created successfully',
                statusCode: 201,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(user, { limit = 20, offset = 1 }) {
        try {
            const [services, total] = await this.serviceRepository.findAndCount({
                where: { user: { id: user.id } },
                order: { createdAt: 'DESC' },
                take: limit,
                skip: limit * (offset - 1),
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, service_collection_resource_1.serviceCollectionResource)(services),
                meta: {
                    total,
                    limit,
                    offset,
                    totalPages,
                    currenPage: offset,
                },
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(id) {
        try {
            const service = await this.serviceRepository.findOne({
                where: { id },
            });
            return (0, service_item_resource_1.serviceItemResource)(service);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateServiceDto, user) {
        try {
            const { items } = updateServiceDto, rest = __rest(updateServiceDto, ["items"]);
            const service = await this.serviceRepository.findOneBy({ id });
            await this.serviceRepository.update(id, Object.assign({}, rest));
            if (items) {
                const existingItems = await this.serviceItemRepository.find({
                    where: { service: { id } },
                });
                const itemsToUpdate = items.filter((item) => item.id);
                const itemsToCreate = items.filter((item) => !item.id);
                const itemsToDelete = existingItems.filter((existingItem) => !items.some((item) => item.id === existingItem.id));
                if (itemsToDelete.length > 0)
                    await this.serviceItemRepository.remove(itemsToDelete);
                if (itemsToUpdate.length > 0) {
                    for (const item of itemsToUpdate) {
                        await this.serviceItemRepository.update(item.id, item);
                    }
                }
                if (itemsToCreate.length > 0) {
                    const newItems = itemsToCreate.map((item) => this.serviceItemRepository.create(Object.assign(Object.assign({}, item), { service: service, user })));
                    await this.serviceItemRepository.save(newItems);
                }
            }
            return {
                messages: 'Service updated successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            await this.serviceItemRepository.softDelete(id);
            return {
                message: 'Service deleted successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __param(1, (0, typeorm_1.InjectRepository)(service_item_entity_1.ServiceItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ServiceService);
//# sourceMappingURL=service.service.js.map