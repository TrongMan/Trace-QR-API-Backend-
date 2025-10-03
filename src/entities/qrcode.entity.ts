import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { ScanLog } from './scanlog.entity';

@Entity()
export class QRCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.qrcodes, { onDelete: 'CASCADE' })
  product: Product;

  @OneToMany(() => ScanLog, (log) => log.qrcode)
  logs: ScanLog[];
}
