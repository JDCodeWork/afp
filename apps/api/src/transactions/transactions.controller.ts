import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { FilterTransactionByCategoryDto } from './dto/filter-transaction-by-category.dto';
import { FilterTransactionByTransactionDto } from './dto/filter-transaction-by-transaction.dto';

@Controller('transactions')
@UseGuards(AuthGuard())
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(createTransactionDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.transactionsService.findAll(user);
  }

  @Get('/filter-by')
  findAllByFilter(
    @Query() filterDto: FilterTransactionByTransactionDto,
    @GetUser() user: User,
  ) {
    return this.transactionsService.findAllByFilterTransaction(filterDto, user);
  }

  @Get('/filter-by/category')
  findAllByFilterCategory(
    @Query() filterDto: FilterTransactionByCategoryDto,
    @GetUser() user: User,
  ) {
    return this.transactionsService.findAllByFilterCategory(filterDto, user);
  }

  @Get(':id')
  findOne(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.remove(id, user);
  }
}
