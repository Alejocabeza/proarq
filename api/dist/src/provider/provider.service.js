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
exports.ProviderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const provider_entity_1 = require("./entities/provider.entity");
const typeorm_2 = require("typeorm");
const provider_item_1 = require("./resources/provider.item");
const provider_collection_1 = require("./resources/provider.collection");
const provider_item_entity_1 = require("./entities/provider-item.entity");
let ProviderService = class ProviderService {
    constructor(providerRepository, providerItemRepository) {
        this.providerRepository = providerRepository;
        this.providerItemRepository = providerItemRepository;
    }
    async create(createProviderDto, user) {
        try {
            const { items } = createProviderDto, rest = __rest(createProviderDto, ["items"]);
            const provider = await this.providerRepository.create(Object.assign(Object.assign({}, rest), { user }));
            await this.providerRepository.save(provider);
            if (items) {
                items.forEach(async (item) => {
                    const providerItem = await this.providerItemRepository.create(Object.assign(Object.assign({}, item), { provider,
                        user }));
                    await this.providerItemRepository.save(providerItem);
                });
            }
            return {
                message: 'Provider created successfully',
                statusCode: 201,
            };
        }
        catch (error) {
            if (error.code === '23505')
                throw new common_1.BadRequestException(error.detail);
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(user, { limit = 20, offset = 1 }) {
        try {
            const [providers, total] = await this.providerRepository.findAndCount({
                where: { user: { id: user.id } },
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, provider_collection_1.providerCollection)(providers),
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
    async findAllItems(user, { limit = 20, offset = 1, provider }) {
        try {
            const [items, total] = await this.providerItemRepository.findAndCount({
                where: { provider: { id: provider }, user: { id: user.id } },
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: items,
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
            const provider = await this.providerRepository.findOne({
                where: { id },
                relations: ['address', 'items'],
            });
            return (0, provider_item_1.providerItem)(provider);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOneItem(id) {
        try {
            const item = await this.providerItemRepository.findOne({
                where: { id },
            });
            return item;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateProviderDto, user) {
        try {
            const { items } = updateProviderDto, rest = __rest(updateProviderDto, ["items"]);
            const provider = await this.providerRepository.findOne({ where: { id } });
            await this.providerRepository.update(id, rest);
            if (items) {
                const existingItems = await this.providerItemRepository.find({
                    where: { provider: { id } },
                });
                const itemsToUpdate = items.filter((item) => item.id);
                const itemsToCreate = items.filter((item) => !item.id);
                const itemsToDelete = existingItems.filter((existingItem) => !items.some((item) => item.id === existingItem.id));
                if (itemsToDelete.length > 0) {
                    await this.providerItemRepository.remove(itemsToDelete);
                }
                if (itemsToUpdate.length > 0) {
                    for (const item of itemsToUpdate) {
                        await this.providerItemRepository.update(item.id, item);
                    }
                }
                if (itemsToCreate.length > 0) {
                    const newItems = itemsToCreate.map((item) => this.providerItemRepository.create(Object.assign(Object.assign({}, item), { provider: provider, user })));
                    await this.providerItemRepository.save(newItems);
                }
            }
            return {
                message: 'Provider updated successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            if (error.code === '23505')
                throw new common_1.BadRequestException(error.detail);
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    remove(id) {
        try {
            this.providerRepository.softDelete(id);
            return {
                message: 'Provider removed successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.ProviderService = ProviderService;
exports.ProviderService = ProviderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(provider_entity_1.Provider)),
    __param(1, (0, typeorm_1.InjectRepository)(provider_item_entity_1.ProviderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProviderService);
//# sourceMappingURL=provider.service.js.map