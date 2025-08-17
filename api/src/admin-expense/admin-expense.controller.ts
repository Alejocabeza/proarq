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
import { AdminExpenseService } from './admin-expense.service';
import { CreateAdminExpenseDto } from './dto/create-admin-expense.dto';
import { UpdateAdminExpenseDto } from './dto/update-admin-expense.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@api/auth/decorators/user.decorator';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Controller('admin_expenses')
export class AdminExpenseController {
  constructor(private readonly adminExpenseService: AdminExpenseService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createAdminExpenseDto: CreateAdminExpenseDto,
    @GetUser() user: User,
  ) {
    return this.adminExpenseService.create(createAdminExpenseDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Query() pagination: PaginationDto) {
    return this.adminExpenseService.findAll(pagination);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.adminExpenseService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateAdminExpenseDto: UpdateAdminExpenseDto,
  ) {
    return this.adminExpenseService.update(id, updateAdminExpenseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.adminExpenseService.remove(id);
  }
}
