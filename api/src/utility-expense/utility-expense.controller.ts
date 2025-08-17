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
import { UtilityExpenseService } from './utility-expense.service';
import { CreateUtilityExpenseDto } from './dto/create-utility-expense.dto';
import { UpdateUtilityExpenseDto } from './dto/update-utility-expense.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@api/auth/decorators/user.decorator';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Controller('utility_expenses')
export class UtilityExpenseController {
  constructor(private readonly utilityExpenseService: UtilityExpenseService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createUtilityExpenseDto: CreateUtilityExpenseDto,
    @GetUser() user: User,
  ) {
    return this.utilityExpenseService.create(createUtilityExpenseDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Query() pagination: PaginationDto) {
    return this.utilityExpenseService.findAll(pagination);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.utilityExpenseService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateUtilityExpenseDto: UpdateUtilityExpenseDto,
  ) {
    return this.utilityExpenseService.update(id, updateUtilityExpenseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.utilityExpenseService.remove(id);
  }
}
