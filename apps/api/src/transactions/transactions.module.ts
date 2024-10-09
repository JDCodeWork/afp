import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Category } from './entities/category.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { CategoryProvider } from './providers/category.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Category]),
    AuthModule,
    CommonModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, CategoryProvider],
  exports: [CategoryProvider],
})
export class TransactionsModule {}
