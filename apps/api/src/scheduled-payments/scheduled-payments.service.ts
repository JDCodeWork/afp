import { Injectable } from '@nestjs/common';
import { CreateScheduledPaymentDto } from './dto/create-scheduled-payment.dto';
import { UpdateScheduledPaymentDto } from './dto/update-scheduled-payment.dto';
import { User } from '@/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduledPayment } from './entities/scheduled-payment.entity';
import { Repository } from 'typeorm';
import { CommonService } from '@/common/common.service';
import { CategoriesService } from '@/categories/categories.service';
import { ErrorCodes } from '@/common/interfaces';
import { TransactionsService } from '@/transactions/transactions.service';
import { Category } from '@/categories/entities/category.entity';

@Injectable()
export class ScheduledPaymentsService {
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
}
