import { Module } from '@nestjs/common';
import { ScheduledPaymentsService } from './scheduled-payments.service';
import { ScheduledPaymentsController } from './scheduled-payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledPayment } from './entities/scheduled-payment.entity';
import { AuthModule } from '@/auth/auth.module';
import { CommonModule } from '@/common/common.module';
import { CategoriesModule } from '@/categories/categories.module';
import { TransactionsModule } from '@/transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduledPayment]),
    AuthModule,
    CommonModule,
    CategoriesModule,
    TransactionsModule,
  ],
  controllers: [ScheduledPaymentsController],
  providers: [ScheduledPaymentsService],
})
export class ScheduledPaymentsModule {}
