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
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const activity_entity_1 = require("./entities/activity.entity");
const typeorm_2 = require("typeorm");
const activity_items_entity_1 = require("./entities/activity-items.entity");
const activity_collection_resource_1 = require("./resources/activity.collection.resource");
const activity_items_resource_1 = require("./resources/activity.items.resource");
let ActivityService = class ActivityService {
    constructor(activityRepository, activityItemRepository) {
        this.activityRepository = activityRepository;
        this.activityItemRepository = activityItemRepository;
    }
    async create(createActivityDto, user) {
        try {
            const { items } = createActivityDto, rest = __rest(createActivityDto, ["items"]);
            const activity = this.activityRepository.create(Object.assign(Object.assign({}, rest), { user }));
            await this.activityRepository.save(activity);
            if (items && items.length > 0) {
                const activityItem = items.map((item) => {
                    return this.activityItemRepository.create(Object.assign(Object.assign({}, item), { activity,
                        user }));
                });
                await this.activityItemRepository.save(activityItem);
            }
            return {
                messages: 'Activity created successfully',
                statusCode: 201,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(user, { limit = 20, offset = 1 }) {
        try {
            const [activities, total] = await this.activityRepository.findAndCount({
                where: { user: { id: user.id } },
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, activity_collection_resource_1.activityCollection)(activities),
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
            const activity = await this.activityRepository.findOne({
                where: { id },
            });
            return (0, activity_items_resource_1.activityItems)(activity);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateActivityDto, user) {
        try {
            const { items } = updateActivityDto, rest = __rest(updateActivityDto, ["items"]);
            const activity = await this.activityRepository.findOne({
                where: { id },
            });
            await this.activityRepository.update(id, Object.assign({}, rest));
            if (items) {
                const existingItems = await this.activityItemRepository.find({
                    where: { activity: { id } },
                });
                const itemsToUpdate = items.filter((item) => item.id);
                const itemsToCreate = items.filter((item) => !item.id);
                const itemsToDelete = existingItems.filter((existingItem) => !items.some((item) => item.id === existingItem.id));
                if (itemsToDelete.length > 0) {
                    await this.activityItemRepository.remove(itemsToDelete);
                }
                if (itemsToUpdate.length > 0) {
                    for (const item of itemsToUpdate) {
                        await this.activityItemRepository.update(item.id, item);
                    }
                }
                if (itemsToCreate.length > 0) {
                    const newItems = itemsToCreate.map((item) => this.activityItemRepository.create(Object.assign(Object.assign({}, item), { activity: activity, user })));
                    await this.activityItemRepository.save(newItems);
                }
            }
            return {
                messages: 'Activity updated successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            await this.activityRepository.softDelete(id);
            return {
                message: 'Activity deleted successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAmounts(id) {
        try {
            const activity = await this.activityRepository.findOne({
                where: { id },
            });
            if (!activity)
                throw new common_1.NotFoundException('Activity not found');
            const { unitedPrice, percentageAmount, items } = activity;
            if (unitedPrice > 0 && percentageAmount > 0) {
                return {
                    unitedPrice: +unitedPrice,
                    percentageAmount: +percentageAmount,
                };
            }
            let unitedPriceNew = 0;
            let percentageAmountNew = 0;
            items.forEach((item) => {
                unitedPriceNew +=
                    +item.providerItem.amount +
                        +item.price.amount +
                        (+item.providerItem.amount +
                            +item.price.amount * (+item.percentage / 100));
                percentageAmountNew +=
                    +item.providerItem.amount +
                        +item.price.amount * (+item.percentage / 100);
            });
            await this.activityRepository.update(id, {
                unitedPrice: unitedPriceNew,
                percentageAmount: percentageAmountNew,
            });
            return {
                unitedPriceNew,
                percentageAmountNew,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activity_entity_1.Activity)),
    __param(1, (0, typeorm_1.InjectRepository)(activity_items_entity_1.ActivityItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ActivityService);
//# sourceMappingURL=activity.service.js.map