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
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { FilterTransactionByCategoryDto } from './dto/filter-transaction-by-category.dto';
import { FilterTransactionByTransactionDto } from './dto/filter-transaction-by-transaction.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Auth } from '@/auth/decorators';

@ApiTags('transactions')
@Controller('transactions')
@Auth()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: 201,
    description: 'The transaction has been created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @GetUser() user: User,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(createTransactionDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions for the user' })
  @ApiResponse({ status: 200, description: 'List of transactions.' })
  findAll(@GetUser() user: User) {
    return this.transactionsService.findAll(user);
  }

  @Get('/filter-by')
  @ApiOperation({
    summary: 'Filter transactions by transaction-specific criteria',
  })
  @ApiResponse({ status: 200, description: 'List of filtered transactions.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  findAllByFilter(
    @Query() filterDto: FilterTransactionByTransactionDto,
    @GetUser() user: User,
  ) {
    return this.transactionsService.findAllByFilterTransaction(filterDto, user);
  }

  @Get('/filter-by/category')
  @ApiOperation({ summary: 'Filter transactions by category' })
  @ApiResponse({
    status: 200,
    description: 'List of filtered transactions by category.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  findAllByFilterCategory(
    @Query() filterDto: FilterTransactionByCategoryDto,
    @GetUser() user: User,
  ) {
    return this.transactionsService.findAllByFilterCategory(filterDto, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific transaction by ID' })
  @ApiResponse({ status: 200, description: 'The requested transaction.' })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  findOne(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific transaction' })
  @ApiResponse({ status: 200, description: 'The updated transaction.' })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific transaction' })
  @ApiResponse({
    status: 204,
    description: 'Transaction successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  remove(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.remove(id, user);
  }
}
