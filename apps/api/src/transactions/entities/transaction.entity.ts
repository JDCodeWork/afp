import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double precision' })
  amount: number;

  @Column({ type: 'text', default: '' })
  note?: string;

  @ManyToOne(() => Category, (category) => category.transactions, {
    eager: true,
  })
  category: Category;

  @Column({ type: 'timestamp', default: new Date() })
  create_at: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
