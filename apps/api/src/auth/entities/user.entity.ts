import { Budget } from '@/budgets/entities/budget.entity';
import { Category } from '@/categories/entities/category.entity';
import { Goal } from '@/goals/entities/goal.entity';
import { ScheduledPayment } from '@/scheduled-payments/entities/scheduled-payment.entity';
import { Transaction } from '@/transactions/entities/transaction.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ValidRoles } from '../interfaces/valid-roles';

@Entity()
export class User {
  @ApiProperty({
    description: 'Unique identifier for the user',
    uniqueItems: true,
    example: 'b7c9b9f4-6590-4f6e-85c8-2c8f3a82e84b',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    maxLength: 100,
  })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    example: 'example@email.test',
    description: 'The email address of the user',
    uniqueItems: true,
    maxLength: 255,
  })
  @Column({ type: 'text', unique: true })
  email: string;

  @ApiProperty({
    title: 'User password',
    description:
      'Password for user authentication. If login type is email, the password is encrypted; else password is null.',
    type: String,
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  password?: string;

  @ApiProperty({
    example: 'email',
    description: 'The login method used by the user. Default is "email".',
    enum: ['email'], // TODO implement google
  })
  @Column({ type: 'text', default: 'email' })
  loginType?: string;

  @ApiProperty({
    example: 'user',
    description: 'The rol of the user',
    enum: ValidRoles,
  })
  @Column({ type: 'text' })
  role: string;

  @ApiProperty({
    description: 'List of transactions associated with the user',
    type: () => Transaction,
    isArray: true,
    nullable: true,
  })
  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: true,
  })
  transactions?: Transaction[];

  @ApiProperty({
    description: 'List of categories associated with the user',
    type: () => Category,
    isArray: true,
    nullable: true,
  })
  @OneToMany(() => Category, (category) => category.user)
  categories?: Category[];

  @ApiProperty({
    description: 'List of budgets associated with the user',
    type: () => Budget,
    isArray: true,
    nullable: true,
  })
  @OneToMany(() => Budget, (budget) => budget.user)
  budgets?: Budget[];

  @ApiProperty({
    description: 'List of goals associated with the user',
    type: () => Goal,
    isArray: true,
    nullable: true,
  })
  @OneToMany(() => Goal, (goal) => goal.user)
  goals?: Goal[];

  @ApiProperty({
    description: 'List of scheduled payments associated with the user',
    type: () => ScheduledPayment,
    isArray: true,
    nullable: true,
  })
  @OneToMany(() => ScheduledPayment, (sP) => sP.user)
  scheduledPayments?: ScheduledPayment[];
}
