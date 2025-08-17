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
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from '@nestjs/passport';
import { ProviderFilterDto } from './dto/provider-filter.dto';
import { GetUser } from '@api/auth/decorators/user.decorator';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createProviderDto: CreateProviderDto, @GetUser() user: User) {
    return this.providerService.create(createProviderDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User, @Query() pagination: PaginationDto) {
    return this.providerService.findAll(user, pagination);
  }

  @Get('/items')
  @UseGuards(AuthGuard())
  findAllItems(@GetUser() user: User, @Query() filter: ProviderFilterDto) {
    return this.providerService.findAllItems(user, filter);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.providerService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
    @GetUser() user: User,
  ) {
    return this.providerService.update(id, updateProviderDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.providerService.remove(id);
  }
}
