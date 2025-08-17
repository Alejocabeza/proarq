import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@api/auth/entities/user.entity';
import { GetUser } from '@api/auth/decorators/user.decorator';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createServiceDto: CreateServiceDto, @GetUser() user: User) {
    return this.serviceService.create(createServiceDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User, @Query() pagination: PaginationDto) {
    return this.serviceService.findAll(user, pagination);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @GetUser() user: User,
  ) {
    return this.serviceService.update(id, updateServiceDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
