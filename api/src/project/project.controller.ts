import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GetUser } from '@api/auth/decorators/user.decorator';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createProjectDto: CreateProjectDto, @GetUser() user: User) {
    return this.projectService.create(createProjectDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User, @Query() pagination: PaginationDto) {
    return this.projectService.findAll(user, pagination);
  }

  @Get('/by_month')
  @UseGuards(AuthGuard())
  findAllByMonth(@GetUser() user: User) {
    return this.projectService.findAllProjectByMonth(user);
  }

  @Get('reports/progress')
  @UseGuards(AuthGuard())
  progressReport(@Res() res: Response, @Query('project') project: string) {
    return this.projectService.generateReport(res, project);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
