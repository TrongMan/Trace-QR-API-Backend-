import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QRCode } from '../entities/qrcode.entity';
import { Product } from '../entities/product.entity';
import crypto from 'crypto';

@Injectable()
export class QrcodeService {
  constructor(
    @InjectRepository(QRCode) private readonly repo: Repository<QRCode>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['product'] });
  }

  async createForProduct(productId: number) {
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('product not found');
    const code = 'QR-' + crypto.randomUUID();
    const entity = this.repo.create({ code, product });
    return this.repo.save(entity);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { deleted: true };
  }

  async findByCode(code: string) {
    return this.repo.findOne({ where: { code }, relations: ['product'] });
  }
}
