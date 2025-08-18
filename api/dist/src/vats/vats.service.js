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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vat_entity_1 = require("./entities/vat.entity");
const typeorm_2 = require("typeorm");
const vat_collection_resource_1 = require("./resources/vat-collection.resource");
const vat_item_resource_1 = require("./resources/vat-item.resource");
let VatsService = class VatsService {
    constructor(vatRepository) {
        this.vatRepository = vatRepository;
    }
    async create(createVatDto, user) {
        try {
            const vat = await this.vatRepository.create(Object.assign(Object.assign({}, createVatDto), { user }));
            await this.vatRepository.save(vat);
            return {
                message: 'Vat created successfully',
                statusCode: 201,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(user, { limit = 20, offset = 1 }) {
        try {
            const [vats, total] = await this.vatRepository.findAndCount({
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, vat_collection_resource_1.vatCollectionResource)(vats),
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
            const vat = await this.vatRepository.findOne({
                where: { id },
            });
            return (0, vat_item_resource_1.vatItemResource)(vat);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateVatDto) {
        try {
            await this.vatRepository.update(id, updateVatDto);
            return {
                message: 'Vat updated successfully.',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            await this.vatRepository.softDelete(id);
            return {
                message: 'Vat delete successfully.',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.VatsService = VatsService;
exports.VatsService = VatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vat_entity_1.Vat)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VatsService);
//# sourceMappingURL=vats.service.js.map