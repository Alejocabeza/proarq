import { HttpException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { ServiceItem } from './entities/service-item.entity';
import { serviceCollectionResource } from './resources/service.collection.resource';
import { serviceItemResource } from './resources/service.item.resource';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(ServiceItem)
    private readonly serviceItemRepository: Repository<ServiceItem>,
  ) {}

  async create(createServiceDto: CreateServiceDto, user: User) {
    try {
      const { items, ...rest } = createServiceDto;
      const service = this.serviceRepository.create({
        ...rest,
        user,
      });
      await this.serviceRepository.save(service);

      if (items && items.length > 0) {
        const serviceItems = items.map((item) =>
          this.serviceItemRepository.create({
            ...item,
            service,
            user,
          }),
        );
        await this.serviceItemRepository.save(serviceItems);
      }

      return {
        message: 'Service created successfully',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: User, { limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [services, total] = await this.serviceRepository.findAndCount({
        where: { user: { id: user.id } },
        order: { createdAt: 'DESC' },
        take: limit,
        skip: limit * (offset - 1),
      });
      const totalPages = Math.ceil(total / limit);
      return {
        data: serviceCollectionResource(services),
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
      const service = await this.serviceRepository.findOne({
        where: { id },
      });
      return serviceItemResource(service);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateServiceDto: UpdateServiceDto, user: User) {
    try {
      const { items, ...rest } = updateServiceDto;

      const service = await this.serviceRepository.findOneBy({ id });

      await this.serviceRepository.update(id, { ...rest });

      if (items) {
        const existingItems = await this.serviceItemRepository.find({
          where: { service: { id } },
        });

        const itemsToUpdate = items.filter((item) => item.id);
        const itemsToCreate = items.filter((item) => !item.id);
        const itemsToDelete = existingItems.filter(
          (existingItem) => !items.some((item) => item.id === existingItem.id),
        );

        if (itemsToDelete.length > 0)
          await this.serviceItemRepository.remove(itemsToDelete);

        if (itemsToUpdate.length > 0) {
          for (const item of itemsToUpdate) {
            await this.serviceItemRepository.update(item.id, item);
          }
        }

        if (itemsToCreate.length > 0) {
          const newItems = itemsToCreate.map((item) =>
            this.serviceItemRepository.create({
              ...item,
              service: service as Service,
              user,
            }),
          );
          await this.serviceItemRepository.save(newItems);
        }
      }

      return {
        messages: 'Service updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      await this.serviceItemRepository.softDelete(id);
      return {
        message: 'Service deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
