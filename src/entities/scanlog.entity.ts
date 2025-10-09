import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { QRCode } from './qrcode.entity';

@Entity({ name: 'scan_log' })
export class ScanLog {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({   type: 'text', nullable: true, default: null })
  location: string | null;

  @Column({ type: 'text', nullable: true, default: null })
  device: string | null;

  @Column({ type: 'text', nullable: true, default: null })
  ip: string | null;

  @Column({ type: 'text', nullable: true, default: null })
  userAgent: string | null;

  @ManyToOne(() => QRCode, (q) => q.logs, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'qrcodeId' })
  qrcode: QRCode;
}
