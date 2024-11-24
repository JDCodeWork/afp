import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from './entities';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from '@/common/common.service';
import { ErrorCodes } from '@/common/interfaces';
import { User } from '@/auth/entities/user.entity';
import { CategoriesService } from '@/categories/categories.service';
import { FilterTransactionByCategoryDto } from './dto/filter-transaction-by-category.dto';
import { FilterTransactionByTransactionDto } from './dto/filter-transaction-by-transaction.dto';
import { Category } from '@/categories/entities/category.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly categoriesService: CategoriesService,
    private readonly commonService: CommonService,
  ) {}

  /**
   * Creates a new transaction and associates it with the user.
   * @param createTransactionDto Data for the new transaction.
   * @param user The user creating the transaction.
   * @returns The created transaction.
   */
  async create(createTransactionDto: CreateTransactionDto, user: User) {
    const { category: categoryId, ...transactionDetails } =
      createTransactionDto;

    const category = await this.categoriesService.findOne(categoryId, user);

    if (!transactionDetails.create_at) {
      transactionDetails.create_at = new Date();
    }

    const transaction = this.transactionRepository.create({
      ...transactionDetails,
      category,
      user,
    });

    try {
      await this.transactionRepository.save(transaction);
      delete transaction.user.email; // Optionally hide sensitive information
      return transaction;
    } catch (error) {
      this.commonService.handleErrors(error);
    }
  }

  /**
   * Retrieves all transactions for a user.
   * @param user The user whose transactions are to be retrieved.
   * @returns An array of transactions.
   */
  async findAll(user: User) {
    return await this.transactionRepository.findBy({ user });
  }

  /**
   * Retrieves transactions filtered by category.
   * @param filterDto The filtering criteria.
   * @param user The user whose transactions are to be retrieved.
   * @returns An array of filtered transactions.
   */
  async findAllByFilterCategory(
    filterDto: FilterTransactionByCategoryDto,
    user: User,
  ) {
    const query = this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.category', 'category')
      .leftJoin('transaction.user', 'user');

    if (Object.keys(filterDto).length < 1) {
      this.commonService.handleErrors(ErrorCodes.FilterTransactionRequired);
    }

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

  /**
   * Retrieves transactions filtered by transaction-specific criteria.
   * @param filterDto The filtering criteria.
   * @param user The user whose transactions are to be retrieved.
   * @returns An array of filtered transactions.
   */
  async findAllByFilterTransaction(
    filterDto: FilterTransactionByTransactionDto,
    user: User,
  ) {
    const query = this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.category', 'category')
      .leftJoin('transaction.user', 'user');

    if (Object.keys(filterDto).length < 1) {
      this.commonService.handleErrors(ErrorCodes.FilterTransactionRequired);
    }

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

  /**
   * Retrieves a specific transaction by ID.
   * @param id The ID of the transaction.
   * @param user The user requesting the transaction.
   * @returns The requested transaction.
   */
  async findOne(id: number, user: User) {
    const transaction = await this.transactionRepository.findOneBy({
      id,
      user,
    });

    if (!transaction) {
      this.commonService.handleErrors(ErrorCodes.TransactionNotFound);
    }

    return transaction;
  }

  /**
   * Updates an existing transaction.
   * @param id The ID of the transaction to update.
   * @param updateTransactionDto The new transaction data.
   * @returns The updated transaction.
   */
  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const { category: categoryId, ...transactionsDetails } =
      updateTransactionDto;

    if (categoryId) {
      const category = await this.categoriesService.findOne(
        categoryId,
        undefined,
      );
      (transactionsDetails as Transaction).category = category;
    }

    const transaction = await this.transactionRepository.preload({
      id,
      ...transactionsDetails,
    });

    if (!transaction) {
      this.commonService.handleErrors(ErrorCodes.TransactionNotFound);
    }

    await this.transactionRepository.save(transaction);
    return transaction;
  }

  /**
   * Deletes a transaction.
   * @param id The ID of the transaction to delete.
   * @param user The user requesting the deletion.
   */
  async remove(id: number, user: User) {
    const transaction = await this.transactionRepository.findOneBy({
      id,
      user,
    });

    if (!transaction) {
      this.commonService.handleErrors(ErrorCodes.TransactionNotFound);
    }

    await this.transactionRepository.remove(transaction);
  }

  /**
   * Refounds transactions to a specific account category.
   * @param categoryId The ID of the category to refound transactions from.
   * @param user The user performing the refound.
   * @param refoundId The ID of the category to refound to (default is 8).
   */
  async refoundToAccount(
    categoryId: number,
    user: User,
    refoundId: number = 8,
  ) {
    const refoundCategory = await this.categoriesService.findOne(
      refoundId,
      user,
    );
    const transactions = await this.transactionRepository.findBy({
      category: { id: categoryId },
      user,
    });

    if (transactions.length === 0) return;

    const updatedTransactions = transactions.map((transaction) => {
      transaction.category = refoundCategory;
      return transaction;
    });

    try {
      await this.transactionRepository.save(updatedTransactions);
    } catch (error) {
      this.commonService.handleErrors(error.code);
    }
  }

  /**
   * Finds scheduled transactions for a user in a specific category.
   * @param user The user whose scheduled transactions are to be found.
   * @param category The category of transactions to find.
   * @returns An array of scheduled transactions.
   */
  findByScheduled(user: User, category: Category) {
    return this.transactionRepository.findBy({
      user,
      category: category,
      isScheduled: true,
    });
  }

  /**
   * Creates multiple transaction instances without saving them.
   * @param transactions An array of transactions to create.
   * @returns An array of created transaction instances.
   */
  createMany(transactions: Omit<Transaction, 'id'>[]) {
    return transactions.map((transaction) =>
      this.transactionRepository.create(transaction),
    );
  }

  /**
   * Saves multiple transactions to the database.
   * @param transactions An array of transactions to save.
   * @returns An array of saved transactions.
   */
  async saveMany(transactions: Transaction[]) {
    return await this.transactionRepository.save(transactions);
  }
}
