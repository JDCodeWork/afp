import { Budget } from '@/budgets/entities/budget.entity';
import { Category } from '@/categories/entities/category.entity';
import { Goal } from '@/goals/entities/goal.entity';
import { ScheduledPayment } from '@/scheduled-payments/entities/scheduled-payment.entity';
import { Transaction } from '@/transactions/entities/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: true,
  })
  transactions?: Transaction[];

  @OneToMany(() => Category, (category) => category.user)
  categories?: Category[];

  @OneToMany(() => Budget, (budget) => budget.user)
  budgets?: Budget[];

  @OneToMany(() => Goal, (goal) => goal.user)
  goals?: Goal[];

  @OneToMany(() => ScheduledPayment, (sP) => sP.user)
  scheduledPayments?: ScheduledPayment[];
}
