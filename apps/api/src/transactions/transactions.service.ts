import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category, Transaction } from './entities';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { ErrorCodes } from 'src/common/interfaces/error-codes.interface';
import { User } from 'src/users/entities/user.entity';
import { CategoryProvider } from './providers/category.provider';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    private readonly categoryProvider: CategoryProvider,
    private readonly commonService: CommonService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, user: User) {
    const {
      category: categoryName,
      create_at,
      ...transactionDetails
    } = createTransactionDto;

    const category = await this.categoryProvider.findOneByName(categoryName);

    if (!category)
      this.commonService.handleErrors({ code: ErrorCodes.CategoryNotFound });

    const transaction = this.transactionRepository.create({
      ...transactionDetails,
      ...(create_at ? create_at : { create_at: new Date() }),
      category,
      user,
    });

    try {
      await this.transactionRepository.save(transaction);
    } catch (error) {
      this.commonService.handleErrors(error);
    }

    return transaction;
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
