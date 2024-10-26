import { Category } from '../../categories/entities/category.entity';
import { User } from '../../auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double precision' })
  amount: number;

  @Column({ type: 'text', default: '' })
  note?: string;

  @Column({ type: 'boolean', default: false })
  isScheduled?: boolean;

  @ManyToOne(() => Category, (category) => category.transactions, {
    eager: true,
    onDelete: 'CASCADE',
  })
  category: Category;

  @Column({ type: 'timestamp', default: new Date() })
  create_at: Date;

  @ManyToOne(() => User, (user) => user.transactions, {
    onDelete: 'CASCADE',
  })
  user: User;
}
