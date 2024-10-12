import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from './entities';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { ErrorCodes } from 'src/common/interfaces/error-codes.interface';
import { User } from 'src/users/entities/user.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    private readonly categoriesService: CategoriesService,
    private readonly commonService: CommonService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, user: User) {
    const { category: categoryId, ...transactionDetails } =
      createTransactionDto;

    const category = await this.categoriesService.findOne(categoryId);

    if (!category)
      this.commonService.handleErrors({ code: ErrorCodes.CategoryNotFound });

    if (!transactionDetails.create_at)
      transactionDetails.create_at = new Date();

    const transaction = this.transactionRepository.create({
      ...transactionDetails,
      category,
      user,
    });

    try {
      await this.transactionRepository.save(transaction);

      delete transaction.user.email;

      return transaction;
    } catch (error) {
      this.commonService.handleErrors(error);
    }
  }

  async findAll(user: User) {
    return await this.transactionRepository.findBy({ user });
  }

  async findOne(id: number, user: User) {
    const transaction = await this.transactionRepository.findOneBy({
      id,
      user,
    });

    if (!transaction)
      this.commonService.handleErrors({
        code: ErrorCodes.TransactionNotFound,
      });

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const { category: categoryId, ...transactionsDetails } =
      updateTransactionDto;

    if (categoryId) {
      const category = await this.categoriesService.findOne(categoryId);

      if (!category)
        this.commonService.handleErrors({ code: ErrorCodes.CategoryNotFound });

      (transactionsDetails as Transaction).category = category;
    }

    const transaction = await this.transactionRepository.preload({
      id,
      ...transactionsDetails,
    });

    if (!transaction)
      this.commonService.handleErrors({ code: ErrorCodes.TransactionNotFound });

    await this.transactionRepository.save(transaction);

    return transaction;
  }

  async remove(id: number, user: User) {
    const transaction = await this.transactionRepository.findOneBy({
      id,
      user,
    });

    if (!transaction)
      this.commonService.handleErrors({ code: ErrorCodes.TransactionNotFound });

    await this.transactionRepository.remove(transaction);
  }
}
