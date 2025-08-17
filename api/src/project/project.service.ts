import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { projectCollectionResource } from './resouces/project.collection.resource';
import { projectItemResource } from './resouces/project.item.resource';
import { Response } from 'express';
import { ReportService } from '@api/report/report.service';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';
import { StatusEnum } from '@api/task/enum/status.enum';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly reportService: ReportService,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: User) {
    try {
      const code = await this.getNewCode(user);
      const project = await this.projectRepository.create({
        ...createProjectDto,
        user,
        code,
      });

      await this.projectRepository.save(project);

      return {
        message: 'Project created successfully.',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: User, { limit = 20, offset = 1 }: PaginationDto) {
    try {
      const [projects, total] = await this.projectRepository.findAndCount({
        where: { user: { id: user.id } },
        order: { createdAt: 'DESC' },
        skip: limit * (offset - 1),
        take: limit,
      });
      const totalPages = Math.ceil(total / limit);
      return {
        data: projectCollectionResource(projects),
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

  async findAllProjectByMonth(user: User) {
    try {
      const projects = await this.projectRepository.find({
        where: { user: { id: user.id } },
        take: 5,
      });
      return projects.map((project) => {
        const total = project.tasks.length;
        const percentage =
          (project.tasks.filter((task) => task.status === StatusEnum.DONE)
            .length /
            total) *
          100;
        return {
          name: project.name,
          total,
          percentage,
        };
      });
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async findOne(id: string) {
    try {
      const project = await this.projectRepository.findOneBy({ id });
      return projectItemResource(project);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      await this.projectRepository.update(id, updateProjectDto);
      return {
        message: 'Project updated successfully.',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      await this.projectRepository.softDelete(id);
      return {
        message: 'Project delete successfully.',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async generateReport(response: Response, id: string) {
    try {
      const project = await this.projectRepository.findOneBy({ id });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      const pdfDoc = await this.reportService.projectProgressReport(project);

      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader(
        'Content-Disposition',
        'attachment; filename=project-progress-report.pdf',
      );
      pdfDoc.info.Title = 'Project Progress Report';
      pdfDoc.pipe(response);
      pdfDoc.end();
    } catch (error) {
      console.error('Error generating PDF:', error.message);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async getNewCode(user: User) {
    const allCodes = await this.getAllCodes(user);
    if (allCodes.length <= 0) return 1;
    const maxCode = Math.max(...allCodes);
    return maxCode + 1;
  }

  async getAllCodes(user: User) {
    try {
      const projects = await this.projectRepository.find({
        where: { user: { id: user.id } },
        select: ['code'],
      });
      return projects.map((project) => project.code);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
