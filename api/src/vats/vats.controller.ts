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
import { VatsService } from './vats.service';
import { CreateVatDto } from './dto/create-vat.dto';
import { UpdateVatDto } from './dto/update-vat.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@api/auth/entities/user.entity';
import { GetUser } from '@api/auth/decorators/user.decorator';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Controller('vats')
export class VatsController {
  constructor(private readonly vatsService: VatsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createVatDto: CreateVatDto, @GetUser() user: User) {
    return this.vatsService.create(createVatDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User, @Query() pagination: PaginationDto) {
    return this.vatsService.findAll(user, pagination);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.vatsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateVatDto: UpdateVatDto) {
    return this.vatsService.update(id, updateVatDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.vatsService.remove(id);
  }
}
