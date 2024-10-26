import { Injectable } from '@nestjs/common';
import { CreateScheduledPaymentDto } from './dto/create-scheduled-payment.dto';
import { UpdateScheduledPaymentDto } from './dto/update-scheduled-payment.dto';
import { User } from '@/auth/entities/user.entity';

@Injectable()
export class ScheduledPaymentsService {
  create(createScheduledPaymentDto: CreateScheduledPaymentDto, user: User) {
    return 'This action adds a new scheduledPayment';
  }

  findAll(user: User) {
    return `This action returns all scheduledPayments`;
  }

  findOne(id: number, user: User) {
    return `This action returns a #${id} scheduledPayment`;
  }

  update(
    id: number,
    updateScheduledPaymentDto: UpdateScheduledPaymentDto,
    user: User,
  ) {
    return `This action updates a #${id} scheduledPayment`;
  }

  remove(id: number, user: User) {
    return `This action removes a #${id} scheduledPayment`;
  }
}
