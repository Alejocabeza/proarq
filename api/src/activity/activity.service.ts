import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { ActivityItem } from './entities/activity-items.entity';
import { activityCollection } from './resources/activity.collection.resource';
import { activityItems } from './resources/activity.items.resource';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(ActivityItem)
    private readonly activityItemRepository: Repository<ActivityItem>,
  ) {}

  async create(createActivityDto: CreateActivityDto, user: User) {
    try {
      const { items, ...rest } = createActivityDto;
      const activity = this.activityRepository.create({
        ...rest,
        user,
      });

      await this.activityRepository.save(activity);

      if (items && items.length > 0) {
        const activityItem = items.map((item) => {
          return this.activityItemRepository.create({
            ...item,
            activity,
            user,
          });
        });
        await this.activityItemRepository.save(activityItem);
      }

      return {
        messages: 'Activity created successfully',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: User, { limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [activities, total] = await this.activityRepository.findAndCount({
        where: { user: { id: user.id } },
        order: { createdAt: 'DESC' },
        skip: limit * (offset - 1),
        take: limit,
      });
      const totalPages = Math.ceil(total / limit);
      return {
        data: activityCollection(activities),
        meta: {
          total,
          limit,
          offset,
          totalPages,
          currenPage: offset,
        },
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const activity = await this.activityRepository.findOne({
        where: { id },
      });
      return activityItems(activity);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateActivityDto: UpdateActivityDto, user: User) {
    try {
      const { items, ...rest } = updateActivityDto;

      const activity = await this.activityRepository.findOne({
        where: { id },
      });

      await this.activityRepository.update(id, {
        ...rest,
      });

      if (items) {
        const existingItems = await this.activityItemRepository.find({
          where: { activity: { id } },
        });

        const itemsToUpdate = items.filter((item) => item.id);
        const itemsToCreate = items.filter((item) => !item.id);
        const itemsToDelete = existingItems.filter(
          (existingItem) => !items.some((item) => item.id === existingItem.id),
        );

        if (itemsToDelete.length > 0) {
          await this.activityItemRepository.remove(itemsToDelete);
        }

        if (itemsToUpdate.length > 0) {
          for (const item of itemsToUpdate) {
            await this.activityItemRepository.update(item.id, item);
          }
        }

        if (itemsToCreate.length > 0) {
          const newItems = itemsToCreate.map((item) =>
            this.activityItemRepository.create({
              ...item,
              activity: activity as Activity,
              user,
            }),
          );
          await this.activityItemRepository.save(newItems);
        }
      }

      return {
        messages: 'Activity updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      await this.activityRepository.softDelete(id);
      return {
        message: 'Activity deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAmounts(id: string) {
    try {
      const activity = await this.activityRepository.findOne({
        where: { id },
      });

      if (!activity) throw new NotFoundException('Activity not found');

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
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
