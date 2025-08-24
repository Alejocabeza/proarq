import { HttpException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { IsNull, Repository } from 'typeorm';
import { taskCollectionResource } from './resources/task-collection.resouces';
import { taskItemResources } from './resources/task-item.resouces';
import { StatusEnum } from './enum/status.enum';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    try {
      const task = await this.taskRepository.create({
        ...createTaskDto,
        user,
      });
      await this.taskRepository.save(task);
      return {
        message: 'Task created successfully.',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: User, { limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [tasks, total] = await this.taskRepository.findAndCount({
        where: {
          user: { id: user.id },
          project: { deletedAt: IsNull() },
        },
        relations: ['project'],
        order: { createdAt: 'DESC' },
        skip: limit * (offset - 1),
        take: limit,
      });
      const totalPages = Math.ceil(total / limit);
      return {
        data: taskCollectionResource(tasks),
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

  async findAllTaskCount(status: StatusEnum, user: User) {
    try {
      const [taskCount, taskStatusCount] = await Promise.all([
        this.taskRepository.count(),
        this.taskRepository.count({
          where: { status, user: { id: user.id } },
        }),
      ]);

      return {
        totalTask: taskCount,
        taskCount: taskStatusCount,
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const task = await this.taskRepository.findOne({
        where: { id },
        relations: ['project'],
      });
      return taskItemResources(task);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      await this.taskRepository.update(id, updateTaskDto);
      return {
        message: 'Task updated successfully.',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      await this.taskRepository.softDelete(id);
      return {
        message: 'Task delete successfully.',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
