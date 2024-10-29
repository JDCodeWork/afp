import { User } from '@/auth/entities/user.entity';
import { Category } from '@/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ScheduledPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', default: 'monthly' })
  frequency: string;

  @Column({ type: 'double precision' })
  amount: number;

  @Column({ type: 'timestamp' })
  next: Date;

  @Column({ type: 'text' })
  note: string;

  @Column({ type: 'timestamp' })
  create_at: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @ManyToOne(() => User, (user) => user.scheduledPayments)
  user: User;
}
