import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { CommonModule } from '@/common/common.module';
import { AuthModule } from '@/auth/auth.module';
import { CategoriesModule } from '@/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Goal]),
    CommonModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
