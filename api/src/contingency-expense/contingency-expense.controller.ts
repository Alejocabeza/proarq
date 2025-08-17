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
import { ContingencyExpenseService } from './contingency-expense.service';
import { CreateContingencyExpenseDto } from './dto/create-contingency-expense.dto';
import { UpdateContingencyExpenseDto } from './dto/update-contingency-expense.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@api/auth/decorators/user.decorator';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Controller('contingency_expenses')
export class ContingencyExpenseController {
  constructor(
    private readonly contingencyExpenseService: ContingencyExpenseService,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createContingencyExpenseDto: CreateContingencyExpenseDto,
    @GetUser() user: User,
  ) {
    return this.contingencyExpenseService.create(
      createContingencyExpenseDto,
      user,
    );
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Query() pagination: PaginationDto) {
    return this.contingencyExpenseService.findAll(pagination);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.contingencyExpenseService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateContingencyExpenseDto: UpdateContingencyExpenseDto,
  ) {
    return this.contingencyExpenseService.update(
      id,
      updateContingencyExpenseDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.contingencyExpenseService.remove(id);
  }
}
