import { User } from '@/auth/entities/user.entity';
import { Category } from '@/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Frequency } from '../constants/frequencies.constant';

@Entity()
export class ScheduledPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', default: 'monthly' })
  frequency: Frequency;

  @Column({ type: 'double precision' })
  amount: number;

  @Column({ type: 'timestamp' })
  next: string;

  @Column({ type: 'text' })
  note: string;

  @Column({ type: 'timestamp', default: new Date() })
  create_at: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @ManyToOne(() => User, (user) => user.scheduledPayments)
  user: User;
}
