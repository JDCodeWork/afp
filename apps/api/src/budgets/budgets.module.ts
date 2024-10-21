import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { AuthModule } from '@/auth/auth.module';
import { CommonModule } from '@/common/common.module';
import { CategoriesModule } from '@/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { TransactionsModule } from '@/transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Budget]),
    AuthModule,
    CommonModule,
    CategoriesModule,
    TransactionsModule,
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService],
})
export class BudgetsModule {}
