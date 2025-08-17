import { HttpException, Injectable } from '@nestjs/common';
import { CreateUtilityExpenseDto } from './dto/create-utility-expense.dto';
import { UpdateUtilityExpenseDto } from './dto/update-utility-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilityExpense } from './entities/utility-expense.entity';
import { Repository } from 'typeorm';
import { utilityExpenseCollection } from './resources/utility-expense-collection.resource';
import { utilityExpenseItem } from './resources/utility-expense-item.resource';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class UtilityExpenseService {
  constructor(
    @InjectRepository(UtilityExpense)
    private readonly utilityExpenseRepository: Repository<UtilityExpense>,
  ) {}

  async create(createUtilityExpenseDto: CreateUtilityExpenseDto, user: User) {
    try {
      const expense = await this.utilityExpenseRepository.create({
        ...createUtilityExpenseDto,
        user,
      });
      await this.utilityExpenseRepository.save(expense);
      return {
        message: 'Utility expense created successfully',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll({ limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [expenses, total] =
        await this.utilityExpenseRepository.findAndCount({
          order: { createdAt: 'DESC' },
          skip: limit * (offset - 1),
          take: limit,
        });
      const totalPages = Math.ceil(total / limit);
      return {
        data: utilityExpenseCollection(expenses),
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
      const expense = await this.utilityExpenseRepository.findOne({
        where: { id },
      });
      return utilityExpenseItem(expense);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateUtilityExpenseDto: UpdateUtilityExpenseDto) {
    try {
      await this.utilityExpenseRepository.update(id, updateUtilityExpenseDto);
      return {
        message: 'Utility expense updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      await this.utilityExpenseRepository.softDelete(id);
      return {
        message: 'Utility expense deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
