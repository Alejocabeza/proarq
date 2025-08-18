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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const typeorm_1 = require("@nestjs/typeorm");
const client_entity_1 = require("./entities/client.entity");
const typeorm_2 = require("typeorm");
const client_collection_1 = require("./resources/client.collection");
const client_item_1 = require("./resources/client.item");
let ClientService = class ClientService {
    constructor(clientRepository, cacheManager) {
        this.clientRepository = clientRepository;
        this.cacheManager = cacheManager;
    }
    async create(createClientDto, user) {
        try {
            const client = await this.clientRepository.create(Object.assign(Object.assign({}, createClientDto), { user }));
            await this.clientRepository.save(client);
            await this.cacheManager.del(`clients_${user.id}_*`);
            return {
                message: 'Client created successfully',
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
            const cachedData = await this.cacheManager.get(`clients_${user.id}_${limit}_${offset}`);
            if (cachedData) {
                return cachedData;
            }
            const [clients, total] = await this.clientRepository.findAndCount({
                where: { user: { id: user.id } },
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            const response = {
                data: (0, client_collection_1.clientCollection)(clients),
                meta: {
                    total,
                    limit,
                    offset,
                    totalPages,
                    currenPage: offset,
                },
            };
            await this.cacheManager.set(`clients_${user.id}_${limit}_${offset}`, response);
            return response;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAllClientByMonth(user) {
        try {
            const months = [
                { label: 'january', month: 0 },
                { label: 'february', month: 1 },
                { label: 'march', month: 2 },
                { label: 'april', month: 3 },
                { label: 'may', month: 4 },
                { label: 'june', month: 5 },
                { label: 'july', month: 6 },
                { label: 'august', month: 7 },
                { label: 'september', month: 8 },
                { label: 'october', month: 9 },
                { label: 'november', month: 10 },
                { label: 'december', month: 11 },
            ];
            const currentYear = new Date().getFullYear();
            const [total, counts] = await Promise.all([
                this.clientRepository.count({
                    where: { user: { id: user.id } },
                }),
                Promise.all(months.map(async (month) => {
                    const from = new Date(currentYear, month.month, 1);
                    const to = new Date(currentYear, month.month + 1, 0);
                    const clientsCount = await this.clientRepository.count({
                        where: {
                            createdAt: (0, typeorm_2.Between)(from, to),
                            user: { id: user.id },
                        },
                    });
                    return {
                        month: month.label,
                        count: clientsCount,
                    };
                })),
            ]);
            return counts.map((count) => (Object.assign(Object.assign({}, count), { count: ((count.count || 0) / total) * 100 })));
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 500);
        }
    }
    async findOne(id) {
        try {
            const client = await this.clientRepository.findOne({
                where: { id },
            });
            return (0, client_item_1.clientItem)(client);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateClientDto) {
        try {
            const client = await this.clientRepository.findOne({ where: { id }, relations: ['user'] });
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
            }
            await this.clientRepository.update(id, updateClientDto);
            await this.cacheManager.del(`clients_${client.user.id}_*`);
            return {
                message: 'Client updated successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            if (error.code === '23505')
                throw new common_1.BadRequestException(error.detail);
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            const client = await this.clientRepository.findOne({ where: { id }, relations: ['user'] });
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
            }
            await this.clientRepository.softDelete(id);
            await this.cacheManager.del(`clients_${client.user.id}_*`);
            return {
                message: 'Client removed successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], ClientService);
//# sourceMappingURL=client.service.js.map