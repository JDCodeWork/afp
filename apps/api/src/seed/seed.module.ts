import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CategoriesModule } from '../categories/categories.module';
import { AuthModule } from '../auth/auth.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [CategoriesModule, AuthModule, TransactionsModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
