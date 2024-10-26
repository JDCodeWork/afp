import { User } from '@/auth/entities/user.entity';
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

  @Column({ type: 'integer' })
  category: number;

  @Column({ type: 'text' })
  note: string;

  @ManyToOne(() => User, (user) => user.scheduledPayments)
  user: User;
}
