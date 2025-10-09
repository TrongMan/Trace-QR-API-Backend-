import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Product } from './product.entity';
import { OneToMany } from 'typeorm';
import { ProcessStep } from './process-step.entity';


@Entity('batch')
export class Batch {
  @PrimaryGeneratedColumn() id: number;

  @Index({ unique: true }) @Column() batchCode: string;
  @Column({ type: 'date' }) productionDate: Date;
  @Column({ type: 'date' }) expiryDate: Date;

  @ManyToOne(() => Product, (p) => p.batches, { nullable: false, onDelete: 'CASCADE' })
  product: Product;

  @OneToMany(() => ProcessStep, s => s.batch, { cascade: false })
  processSteps: ProcessStep[];
}
