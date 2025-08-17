import { HttpException, Injectable } from '@nestjs/common';
import { CreateAdminExpenseDto } from './dto/create-admin-expense.dto';
import { UpdateAdminExpenseDto } from './dto/update-admin-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminExpense } from './entities/admin-expense.entity';
import { Repository } from 'typeorm';
import { adminExpenseCollection } from './resources/admin-expense-collection.resource';
import { adminExpenseItem } from './resources/admin-expense-item.resource';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class AdminExpenseService {
  constructor(
    @InjectRepository(AdminExpense)
    private readonly adminExpenseRepository: Repository<AdminExpense>,
  ) {}
  async create(createAdminExpenseDto: CreateAdminExpenseDto, user: User) {
    try {
      const adminExpense = await this.adminExpenseRepository.create({
        ...createAdminExpenseDto,
        user,
      });
      await this.adminExpenseRepository.save(adminExpense);
      return {
        message: 'Admin expense created successfully',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll({ limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [adminExpenses, total] =
        await this.adminExpenseRepository.findAndCount({
          order: { createdAt: 'DESC' },
          skip: limit * (offset - 1),
          take: limit,
        });
      const totalPages = Math.ceil(total / limit);
      return {
        data: adminExpenseCollection(adminExpenses),
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
      const adminExpense = await this.adminExpenseRepository.findOne({
        where: { id },
      });
      return adminExpenseItem(adminExpense);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateAdminExpenseDto: UpdateAdminExpenseDto) {
    try {
      await this.adminExpenseRepository.update(id, updateAdminExpenseDto);
      return {
        message: 'Admin expense updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      await this.adminExpenseRepository.softDelete(id);
      return {
        message: 'Admin expense deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
