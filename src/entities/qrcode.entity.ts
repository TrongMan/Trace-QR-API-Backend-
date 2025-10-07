import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { ScanLog } from './scanlog.entity';

@Entity({ name: 'qrcode' })
export class QRCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.qrcodes, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'productId' })
  product: Product | null;

  @OneToMany(() => ScanLog, (log) => log.qrcode)
  logs: ScanLog[];
}
