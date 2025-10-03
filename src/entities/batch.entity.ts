import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Batch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  batchCode: string;

  @Column({ type: 'date' })
  productionDate: Date;

  @Column({ type: 'date' })
  expiryDate: Date;

  @ManyToOne(() => Product, (product) => product.batches)
  product: Product;
}
