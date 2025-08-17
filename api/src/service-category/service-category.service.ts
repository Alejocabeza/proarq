import { HttpException, Injectable } from '@nestjs/common';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceCategory } from './entities/service-category.entity';
import { Repository } from 'typeorm';
import { serviceCategoryItem } from './resources/service-category-item.resource';
import { serviceCategoryCollection } from './resources/service-category-collection.resource';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class ServiceCategoryService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly serviceCategoryRepository: Repository<ServiceCategory>,
  ) {}

  async create(createServiceCategoryDto: CreateServiceCategoryDto, user: User) {
    try {
      const category = await this.serviceCategoryRepository.create({
        ...createServiceCategoryDto,
        user,
      });
      await this.serviceCategoryRepository.save(category);
      return {
        message: 'Service Category created successfully',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: User, { limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [categories, total] =
        await this.serviceCategoryRepository.findAndCount({
          where: { user: { id: user.id } },
          order: { createdAt: 'DESC' },
          skip: limit * (offset - 1),
          take: limit,
        });
      const totalPages = Math.ceil(total / limit);
      return {
        data: serviceCategoryCollection(categories),
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
      const category = await this.serviceCategoryRepository.findOne({
        where: { id },
      });
      return serviceCategoryItem(category);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateServiceCategoryDto: UpdateServiceCategoryDto) {
    try {
      await this.serviceCategoryRepository.update(id, updateServiceCategoryDto);
      return {
        message: 'Service Category updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      await this.serviceCategoryRepository.softDelete(id);
      return {
        message: 'Service Category deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
