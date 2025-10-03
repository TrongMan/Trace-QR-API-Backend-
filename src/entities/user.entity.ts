import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true }) username: string; // hoặc email nếu dùng email
  @Column() password: string;
  @Column({ default: 'user' }) role: string;

  @OneToMany(() => Product, (product) => product.owner)
  products: Product[];
}
