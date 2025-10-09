import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Batch } from './batch.entity';


@Entity({ name: 'process_step' })
export class ProcessStep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  batchId: number;

  @ManyToOne(() => Batch, b => b.processSteps, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'batchId' })
  batch: Batch;

  @Column({ length: 120 })
  stepName: string;              // ví dụ: Harvest, Washing, Packaging

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int', default: 1 })
  stepOrder: number;             // thứ tự trong quy trình

  @Column({ type: 'timestamptz', nullable: true })
  startedAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  finishedAt?: Date;

  @Column({ type: 'jsonb', nullable: true })
  meta?: Record<string, any>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
