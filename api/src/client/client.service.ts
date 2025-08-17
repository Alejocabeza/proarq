import { BadRequestException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Between, Repository } from 'typeorm';
import { clientCollection } from './resources/client.collection';
import { clientItem } from './resources/client.item';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createClientDto: CreateClientDto, user: User) {
    try {
      const client = await this.clientRepository.create({
        ...createClientDto,
        user,
      });

      await this.clientRepository.save(client);

      await this.cacheManager.del(`clients_${user.id}_*`);

      return {
        message: 'Client created successfully',
        statusCode: 201,
      };
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: User, { limit = 20, offset = 1 }: PaginationDto) {
    try {
      const cachedData = await this.cacheManager.get(
        `clients_${user.id}_${limit}_${offset}`,
      );
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
        data: clientCollection(clients),
        meta: {
          total,
          limit,
          offset,
          totalPages,
          currenPage: offset,
        },
      };

      await this.cacheManager.set(
        `clients_${user.id}_${limit}_${offset}`,
        response,
      );

      return response;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllClientByMonth(user: User) {
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
        Promise.all(
          months.map(async (month) => {
            const from = new Date(currentYear, month.month, 1);
            const to = new Date(currentYear, month.month + 1, 0);

            const clientsCount = await this.clientRepository.count({
              where: {
                createdAt: Between(from, to),
                user: { id: user.id },
              },
            });

            return {
              month: month.label,
              count: clientsCount,
            };
          }),
        ),
      ]);

      return counts.map((count) => ({
        ...count,
        count: ((count.count || 0) / total) * 100,
      }));
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async findOne(id: string) {
    try {
      const client = await this.clientRepository.findOne({
        where: { id },
      });

      return clientItem(client);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      const client = await this.clientRepository.findOne({ where: { id }, relations: ['user'] });
      if (!client) {
        throw new NotFoundException('Client not found');
      }
      await this.clientRepository.update(id, updateClientDto);
      await this.cacheManager.del(`clients_${client.user.id}_*`);

      return {
        message: 'Client updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const client = await this.clientRepository.findOne({ where: { id }, relations: ['user'] });
      if (!client) {
        throw new NotFoundException('Client not found');
      }
      await this.clientRepository.softDelete(id);
      await this.cacheManager.del(`clients_${client.user.id}_*`);
      return {
        message: 'Client removed successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
