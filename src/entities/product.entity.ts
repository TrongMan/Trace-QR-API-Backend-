import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Batch } from './batch.entity';
import { User } from './user.entity';
import { QRCode } from './qrcode.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.products)
  owner: User;

  @OneToMany(() => QRCode, (qrcode) => qrcode.product)
  qrcodes: QRCode[];

  @OneToMany(() => Batch, (batch) => batch.product)
  batches: Batch[];
}
