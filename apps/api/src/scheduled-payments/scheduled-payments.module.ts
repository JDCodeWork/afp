import { Module } from '@nestjs/common';
import { ScheduledPaymentsService } from './scheduled-payments.service';
import { ScheduledPaymentsController } from './scheduled-payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledPayment } from './entities/scheduled-payment.entity';
import { AuthModule } from '@/auth/auth.module';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduledPayment]),
    AuthModule,
    CommonModule,
  ],
  controllers: [ScheduledPaymentsController],
  providers: [ScheduledPaymentsService],
})
export class ScheduledPaymentsModule {}
