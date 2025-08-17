import { HttpException, Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { Repository } from 'typeorm';
import { priceCollection } from './resouces/price.collection';
import { priceItem } from './resouces/price.item';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}

  async create(createPriceDto: CreatePriceDto, user: User) {
    try {
      const price = await this.priceRepository.create({
        ...createPriceDto,
        user,
      });

      await this.priceRepository.save(price);

      return {
        message: 'Price created successfully',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: User, { limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [prices, total] = await this.priceRepository.findAndCount({
        where: { user: { id: user.id } },
        order: { createdAt: 'DESC' },
        skip: limit * (offset - 1),
        take: limit,
      });
      const totalPages = Math.ceil(total / limit);
      return {
        data: priceCollection(prices),
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
      const price = await this.priceRepository.findOne({
        where: { id },
      });
      return priceItem(price);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updatePriceDto: UpdatePriceDto) {
    try {
      await this.priceRepository.update(id, updatePriceDto);
      return {
        message: 'Price updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      await this.priceRepository.softDelete(id);
      return {
        message: 'Price deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
