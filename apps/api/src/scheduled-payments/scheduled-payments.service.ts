import { User } from '@/auth/entities/user.entity';
import { CategoriesService } from '@/categories/categories.service';
import { Category } from '@/categories/entities/category.entity';
import { CommonService } from '@/common/common.service';
import { ErrorCodes } from '@/common/interfaces';
import { TransactionsService } from '@/transactions/transactions.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduledPaymentDto } from './dto/create-scheduled-payment.dto';
import { UpdateScheduledPaymentDto } from './dto/update-scheduled-payment.dto';
import { ScheduledPayment } from './entities/scheduled-payment.entity';

import { DateTime } from 'luxon';

@Injectable()
export class ScheduledPaymentsService {
  private readonly logger = new Logger('ScheduledPayments');

  constructor(
    @InjectRepository(ScheduledPayment)
    private readonly scheduledRepository: Repository<ScheduledPayment>,

    private readonly commonService: CommonService,
    private readonly categoriesService: CategoriesService,
    private readonly transactionsService: TransactionsService,
  ) {}

  async create(
    createScheduledPaymentDto: CreateScheduledPaymentDto,
    user: User,
  ) {
    const { category: categoryId, ...scheduledDetails } =
      createScheduledPaymentDto;

    const category = await this.categoriesService.findOne(categoryId, user);

    const newScheduledPayment = this.scheduledRepository.create({
      ...scheduledDetails,
      create_at: new Date().toISOString(),
      category,
      user,
    });

    // TODO Run job to check 'next' property to handle new transaction

    try {
      await this.scheduledRepository.save(newScheduledPayment);

      return newScheduledPayment;
    } catch (error) {
      this.commonService.handleErrors(error.code);
    }
  }

  findAll(user: User) {
    return this.scheduledRepository.findBy({ user, isActive: true });
  }

  async findOne(id: number, user: User) {
    const scheduled = await this.scheduledRepository.findOne({
      where: { id, user },
      relations: { category: true },
    });

    if (!scheduled)
      this.commonService.handleErrors(ErrorCodes.ScheduledNotFound);

    const transactions = await this.transactionsService.findByScheduled(
      user,
      scheduled.category,
    );

    return {
      ...scheduled,
      transactions,
    };
  }

  async update(
    id: number,
    updateScheduledPaymentDto: UpdateScheduledPaymentDto,
    user: User,
  ) {
    const { category: categoryId, ...updateScheduledDetails } =
      updateScheduledPaymentDto;

    const scheduled = await this.scheduledRepository.findOneBy({ id, user });

    let category: Category = scheduled.category;

    if (!scheduled)
      this.commonService.handleErrors(ErrorCodes.ScheduledNotFound);

    if (categoryId) {
      category = await this.categoriesService.findOne(categoryId, user);
    }

    const updatedScheduled: ScheduledPayment = {
      category,
      ...scheduled,
      ...updateScheduledDetails,
    };

    try {
      await this.scheduledRepository.save(updatedScheduled);

      return updatedScheduled;
    } catch (error) {
      this.commonService.handleErrors(error.code);
    }
  }

  async remove(id: number, user: User) {
    const scheduled = await this.scheduledRepository.findOneBy({ id, user });

    await this.scheduledRepository.remove(scheduled);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleNewPayment() {
    this.logger.log('Starting request for scheduled payments');

    const today = new Date().toISOString().split('T')[0];

    let upcomingPayments = await this.scheduledRepository.find({
      where: { next: today },
      relations: { user: true, category: true },
    });

    const newTransactions = [];

    if (upcomingPayments.length > 0)
      upcomingPayments = upcomingPayments.map((payment) => {
        const { amount, category, user, note } = payment;

        const newTransaction = {
          create_at: new Date(),
          isScheduled: true,
          category,
          user,
          amount,
          note,
        };

        newTransactions.push(newTransaction);

        const dt = DateTime.now();

        // TODO: Refactor this logic
        switch (payment.frequency) {
          case 'annual':
            payment.next = dt.plus({ years: 1 }).toISO().split('T')[0];
            break;
          case 'semiannual':
            payment.next = dt.plus({ months: 6 }).toISO().split('T')[0];
            break;
          case 'quarterly':
            payment.next = dt.plus({ months: 3 }).toISO().split('T')[0];
            break;
          case 'monthly':
            payment.next = dt.plus({ months: 1 }).toISO().split('T')[0];
            break;
          case 'biweekly':
            payment.next = dt.plus({ weeks: 2 }).toISO().split('T')[0];
            break;
          default:
            break;
        }

        return {
          ...payment,
        };
      });

    try {
      const data = await this.transactionsService.saveMany(
        this.transactionsService.createMany(newTransactions),
      );

      await this.scheduledRepository.save(upcomingPayments);

      this.logger.log(`${data.length} payments have been complete`);
    } catch (error) {
      this.commonService.handleErrors(error.code);
    }
  }
}
