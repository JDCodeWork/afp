import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from './entities';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from '../common/common.service';
import { ErrorCodes } from '../common/interfaces/error-codes.interface';
import { User } from '../users/entities/user.entity';
import { CategoriesService } from '../categories/categories.service';
import { FilterTransactionByCategoryDto } from './dto/filter-transaction-by-category.dto';
import { FilterTransactionByTransactionDto } from './dto/filter-transaction-by-transaction.dto';

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

  async findAllByFilterCategory(
    filterDto: FilterTransactionByCategoryDto,
    user: User,
  ) {
    const query = this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.category', 'category')
      .leftJoinAndSelect('transaction.user', 'user')
      .select(['transaction', 'category']);

    if (Object.keys(filterDto).length < 1)
      this.commonService.handleErrors(ErrorCodes.FilterTransactionRequired);

    query.andWhere('user.id = :id', { id: user.id });

    Object.keys(filterDto).forEach((key) => {
      const value = filterDto[key];

      if (value) {
        query.andWhere(`category.${key} = :${key}`, {
          [key]: value,
        });
      }
    });

    return await query.getMany();
  }

  async findAllByFilterTransaction(
    filterDto: FilterTransactionByTransactionDto,
    user: User,
  ) {
    const query = this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.user', 'user')
      .leftJoinAndSelect('transaction.category', 'category')
      .select(['transaction', 'category']);

    if (Object.keys(filterDto).length < 1)
      this.commonService.handleErrors(ErrorCodes.FilterTransactionRequired);

    query.andWhere('user.id = :id', { id: user.id });

    Object.keys(filterDto).forEach((key) => {
      const value = filterDto[key];

      if (value) {
        query.andWhere(`transaction.${key} = :${key}`, {
          [key]: value,
        });
      }
    });

    return await query.getMany();
  }

  async findOne(id: number, user: User) {
    const transaction = await this.transactionRepository.findOneBy({
      id,
      user,
    });

    if (!transaction)
      this.commonService.handleErrors(ErrorCodes.TransactionNotFound);

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const { category: categoryId, ...transactionsDetails } =
      updateTransactionDto;

    if (categoryId) {
      const category = await this.categoriesService.findOne(categoryId);

      (transactionsDetails as Transaction).category = category;
    }

    const transaction = await this.transactionRepository.preload({
      id,
      ...transactionsDetails,
    });

    if (!transaction)
      this.commonService.handleErrors(ErrorCodes.TransactionNotFound);

    await this.transactionRepository.save(transaction);

    return transaction;
  }

  async remove(id: number, user: User) {
    const transaction = await this.transactionRepository.findOneBy({
      id,
      user,
    });

    if (!transaction)
      this.commonService.handleErrors(ErrorCodes.TransactionNotFound);

    await this.transactionRepository.remove(transaction);
  }
}
