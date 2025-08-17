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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@api/auth/decorators/user.decorator';
import { User } from '@api/auth/entities/user.entity';
import { PaginationDto } from '@api/common/dto/pagination.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createClientDto: CreateClientDto, @GetUser() user: User) {
    return this.clientService.create(createClientDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User, @Query() pagination: PaginationDto) {
    return this.clientService.findAll(user, pagination);
  }

  @Get('/by_month')
  @UseGuards(AuthGuard())
  findAllByMonth(@GetUser() user: User) {
    return this.clientService.findAllClientByMonth(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
