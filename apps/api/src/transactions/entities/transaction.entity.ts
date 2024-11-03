import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @ApiProperty({
    description: 'Unique identifier for the transaction.',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The amount of the transaction.',
    example: 150.75,
  })
  @Column({ type: 'double precision' })
  amount: number;

  @ApiProperty({
    description: 'An optional note describing the transaction.',
    example: 'Payment for groceries',
    default: '',
  })
  @Column({ type: 'text', default: '' })
  note?: string;

  @ApiProperty({
    description: 'Indicates whether the transaction is scheduled.',
    example: false,
  })
  @Column({ type: 'boolean', default: false })
  isScheduled?: boolean;

  @ApiProperty({
    description: 'Category associated with the transaction.',
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.transactions, {
    eager: true,
    onDelete: 'CASCADE',
  })
  category: Category;

  @ApiProperty({
    description: 'Timestamp when the transaction was created.',
    example: '2024-01-01T12:00:00Z',
  })
  @Column({ type: 'timestamp', default: new Date() })
  create_at: Date;

  @ApiProperty({
    description: 'User associated with the transaction.',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.transactions, {
    onDelete: 'CASCADE',
  })
  user: User;
}
