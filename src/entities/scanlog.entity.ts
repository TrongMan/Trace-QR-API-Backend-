import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { QRCode } from './qrcode.entity';

@Entity()
export class ScanLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  scannedAt: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  device: string;

  @ManyToOne(() => QRCode, (qr) => qr.logs)
  qrcode: QRCode;
}
