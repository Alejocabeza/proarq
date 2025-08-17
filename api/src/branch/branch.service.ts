import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Repository } from 'typeorm';
import { branchCollection } from './resources/branch.collection';
import { branchItem } from './resources/branch.item';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
  ) {}

  async create(createBranchDto: CreateBranchDto, user: User) {
    try {
      const branch = await this.branchRepository.create({
        ...createBranchDto,
        user,
      });
      await this.branchRepository.save(branch);
      return {
        message: 'Branch created successfully',
        statusCode: 201,
      };
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: User, { limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [branches, total] = await this.branchRepository.findAndCount({
        where: { user: { id: user.id } },
        order: { createdAt: 'DESC' },
        skip: limit * (offset - 1),
        take: limit,
      });
      const totalPages = Math.ceil(total / limit);
      return {
        data: branchCollection(branches),
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
      const branch = await this.branchRepository.findOne({
        where: { id },
      });
      return branchItem(branch);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateBranchDto: UpdateBranchDto) {
    try {
      await this.branchRepository.update(id, updateBranchDto);
      return {
        message: 'Branch updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  remove(id: string) {
    try {
      this.branchRepository.softDelete(id);
      return {
        message: 'Branch deleted successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
