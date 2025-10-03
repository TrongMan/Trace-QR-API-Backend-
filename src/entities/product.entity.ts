import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Batch } from './batch.entity';
import { User } from './user.entity';
import { QRCode } from './qrcode.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;
  @Column({ nullable: true }) sku?: string;

  @ManyToOne(() => User, u => u.products, { nullable: true })
  @JoinColumn({ name: 'ownerId' })          // tạo cột ownerId rõ ràng
  owner: User;

  @OneToMany(() => QRCode, q => q.product) qrcodes: QRCode[];
  @OneToMany(() => Batch,  b => b.product) batches: Batch[];
}
