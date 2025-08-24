import { HttpException, Injectable } from '@nestjs/common';
import { CreateVatDto } from './dto/create-vat.dto';
import { UpdateVatDto } from './dto/update-vat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vat } from './entities/vat.entity';
import { Repository } from 'typeorm';
import { vatCollectionResource } from './resources/vat-collection.resource';
import { vatItemResource } from './resources/vat-item.resource';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class VatsService {
  constructor(
    @InjectRepository(Vat)
    private readonly vatRepository: Repository<Vat>,
  ) {}

  async create(createVatDto: CreateVatDto, user: User) {
    try {
      const vat = await this.vatRepository.create({
        ...createVatDto,
        user,
      });
      await this.vatRepository.save(vat);
      return {
        message: 'Vat created successfully',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: User, { limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [vats, total] = await this.vatRepository.findAndCount({
        order: { createdAt: 'DESC' },
        skip: limit * (offset - 1),
        take: limit,
      });
      const totalPages = Math.ceil(total / limit);
      return {
        data: vatCollectionResource(vats),
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

  async findOne(id: number) {
    try {
      const vat = await this.vatRepository.findOne({
        where: { id },
      });
      return vatItemResource(vat);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateVatDto: UpdateVatDto) {
    try {
      await this.vatRepository.update(id, updateVatDto);
      return {
        message: 'Vat updated successfully.',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      await this.vatRepository.softDelete(id);
      return {
        message: 'Vat delete successfully.',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
