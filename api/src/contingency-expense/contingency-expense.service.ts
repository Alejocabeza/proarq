import { HttpException, Injectable } from '@nestjs/common';
import { CreateContingencyExpenseDto } from './dto/create-contingency-expense.dto';
import { UpdateContingencyExpenseDto } from './dto/update-contingency-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContingencyExpense } from './entities/contingency-expense.entity';
import { Repository } from 'typeorm';
import { contingencyExpenseCollection } from './resources/contingency-expense-collection.resource';
import { contingencyExpenseItem } from './resources/contingency-expense-item.resource';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class ContingencyExpenseService {
  constructor(
    @InjectRepository(ContingencyExpense)
    private readonly contingencyExpenseRepository: Repository<ContingencyExpense>,
  ) {}
  async create(
    createContingencyExpenseDto: CreateContingencyExpenseDto,
    user: User,
  ) {
    try {
      const expense = await this.contingencyExpenseRepository.create({
        ...createContingencyExpenseDto,
        user,
      });
      await this.contingencyExpenseRepository.save(expense);
      return {
        message: 'Contingency expense created successfully',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll({ limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [expenses, total] =
        await this.contingencyExpenseRepository.findAndCount({
          order: { createdAt: 'DESC' },
          skip: limit * (offset - 1),
          take: limit,
        });
      const totalPages = Math.ceil(total / limit);
      return {
        data: contingencyExpenseCollection(expenses),
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
      const expense = await this.contingencyExpenseRepository.findOne({
        where: { id },
      });
      return contingencyExpenseItem(expense);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: string,
    updateContingencyExpenseDto: UpdateContingencyExpenseDto,
  ) {
    try {
      await this.contingencyExpenseRepository.update(
        id,
        updateContingencyExpenseDto,
      );
      return {
        message: 'Contingency expense updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      await this.contingencyExpenseRepository.softDelete(id);
      return {
        message: 'Contingency expense deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
