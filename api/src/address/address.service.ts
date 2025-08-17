import { HttpException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { addressItem } from './resources/address.item';
import { addressCollection } from './resources/address.collection';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto, data: User) {
    try {
      const address = await this.addressRepository.create({
        ...createAddressDto,
        user: data.id,
      });

      await this.addressRepository.save(address);

      return {
        message: 'Address created successfully',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll({ limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [addresses, total] = await this.addressRepository.findAndCount({
        order: { createdAt: 'DESC' },
        skip: limit * (offset - 1),
        take: limit,
      });
      const totalPages = Math.ceil(total / limit);
      return {
        data: addressCollection(addresses),
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
      const address = await this.addressRepository.findOne({
        where: { id },
      });

      return addressItem(address);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    try {
      await this.addressRepository.update(id, updateAddressDto);

      return {
        message: 'Address updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      await this.addressRepository.softDelete(id);
      return {
        message: 'Address deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
