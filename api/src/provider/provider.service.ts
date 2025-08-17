import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository } from 'typeorm';
import { providerItem } from './resources/provider.item';
import { providerCollection } from './resources/provider.collection';
import { ProviderItem } from './entities/provider-item.entity';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';
import { ProviderFilterDto } from './dto/provider-filter.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    @InjectRepository(ProviderItem)
    private readonly providerItemRepository: Repository<ProviderItem>,
  ) {}

  async create(createProviderDto: CreateProviderDto, user: User) {
    try {
      const { items, ...rest } = createProviderDto;
      const provider = await this.providerRepository.create({
        ...rest,
        user,
      });
      await this.providerRepository.save(provider);

      if (items) {
        items.forEach(async (item) => {
          const providerItem = await this.providerItemRepository.create({
            ...item,
            provider,
            user,
          });
          await this.providerItemRepository.save(providerItem);
        });
      }

      return {
        message: 'Provider created successfully',
        statusCode: 201,
      };
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: User, { limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [providers, total] = await this.providerRepository.findAndCount({
        where: { user: { id: user.id } },
        order: { createdAt: 'DESC' },
        skip: limit * (offset - 1),
        take: limit,
      });
      const totalPages = Math.ceil(total / limit);
      return {
        data: providerCollection(providers),
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

  async findAllItems(
    user: User,
    { limit = 20, offset = 1, provider }: ProviderFilterDto,
  ) {
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
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const provider = await this.providerRepository.findOne({
        where: { id },
        relations: ['address', 'items'],
      });
      return providerItem(provider);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOneItem(id: string) {
    try {
      const item = await this.providerItemRepository.findOne({
        where: { id },
      });
      return item;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateProviderDto: UpdateProviderDto, user: User) {
    try {
      const { items, ...rest } = updateProviderDto;
      const provider = await this.providerRepository.findOne({ where: { id } });
      await this.providerRepository.update(id, rest);

      if (items) {
        const existingItems = await this.providerItemRepository.find({
          where: { provider: { id } },
        });

        const itemsToUpdate = items.filter((item) => item.id);
        const itemsToCreate = items.filter((item) => !item.id);
        const itemsToDelete = existingItems.filter(
          (existingItem) => !items.some((item) => item.id === existingItem.id),
        );

        if (itemsToDelete.length > 0) {
          await this.providerItemRepository.remove(itemsToDelete);
        }

        if (itemsToUpdate.length > 0) {
          for (const item of itemsToUpdate) {
            await this.providerItemRepository.update(item.id, item);
          }
        }

        if (itemsToCreate.length > 0) {
          const newItems = itemsToCreate.map((item) =>
            this.providerItemRepository.create({
              ...item,
              provider: provider as Provider,
              user,
            }),
          );
          await this.providerItemRepository.save(newItems);
        }
      }

      return {
        message: 'Provider updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);
      throw new HttpException(error.message, error.status);
    }
  }

  remove(id: string) {
    try {
      this.providerRepository.softDelete(id);
      return {
        message: 'Provider removed successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
