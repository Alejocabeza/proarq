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
exports.PriceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const price_entity_1 = require("./entities/price.entity");
const typeorm_2 = require("typeorm");
const price_collection_1 = require("./resouces/price.collection");
const price_item_1 = require("./resouces/price.item");
let PriceService = class PriceService {
    constructor(priceRepository) {
        this.priceRepository = priceRepository;
    }
    async create(createPriceDto, user) {
        try {
            const price = await this.priceRepository.create(Object.assign(Object.assign({}, createPriceDto), { user }));
            await this.priceRepository.save(price);
            return {
                message: 'Price created successfully',
                statusCode: 201,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(user, { limit = 20, offset = 1 }) {
        try {
            const [prices, total] = await this.priceRepository.findAndCount({
                where: { user: { id: user.id } },
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, price_collection_1.priceCollection)(prices),
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
            const price = await this.priceRepository.findOne({
                where: { id },
            });
            return (0, price_item_1.priceItem)(price);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updatePriceDto) {
        try {
            await this.priceRepository.update(id, updatePriceDto);
            return {
                message: 'Price updated successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            await this.priceRepository.softDelete(id);
            return {
                message: 'Price deleted successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.PriceService = PriceService;
exports.PriceService = PriceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(price_entity_1.Price)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PriceService);
//# sourceMappingURL=price.service.js.map