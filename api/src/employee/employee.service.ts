import { HttpException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { employeeCollectionResources } from './resources/employee-collection.resource';
import { employeeItemResources } from './resources/employee-item.resource';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto, user: User) {
    try {
      const employee = await this.employeeRepository.create({
        ...createEmployeeDto,
        user: user,
      });
      await this.employeeRepository.save(employee);
      return {
        message: 'Employee created successfully',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: User, { limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [employees, total] = await this.employeeRepository.findAndCount({
        where: { user: { id: user.id } },
        take: limit,
        skip: (offset - 1) * limit,
        order: { createdAt: 'DESC' },
      });
      const totalPages = Math.ceil(total / limit);
      return {
        data: employeeCollectionResources(employees),
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
      const project = await this.employeeRepository.findOneBy({ id });
      return employeeItemResources(project);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      await this.employeeRepository.update(id, updateEmployeeDto);
      return {
        message: 'Employee updated successfully.',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      await this.employeeRepository.softDelete(id);
      return {
        message: 'Employee delete successfully.',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
