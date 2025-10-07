import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QRCode } from '../entities/qrcode.entity';
import { Product } from '../entities/product.entity';
import crypto from 'crypto';

function genCode() {
  // Ngắn gọn, dễ đọc, tránh va chạm với tiền tố
  return 'QR-' + crypto.randomUUID().replace(/-/g, '').slice(0, 16).toUpperCase();
}

@Injectable()
export class QrcodeService {
  constructor(
    @InjectRepository(QRCode) private readonly repo: Repository<QRCode>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) {}

  async findAll(limit = 50, offset = 0) {
    const [items, total] = await this.repo.findAndCount({
      relations: ['product'],
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    });
    return { total, items };
  }

  // Cho phép truyền sẵn code; nếu không, tự sinh và đảm bảo unique
  async createForProduct(productId: number, code?: string) {
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('product not found');

    let finalCode = code?.trim() || genCode();

    // đảm bảo unique theo unique index ở entity
    const existed = await this.repo.findOne({ where: { code: finalCode } });
    if (existed) {
      if (code) throw new BadRequestException('code already exists');
      // nếu tự sinh mà đụng thì sinh lại vài lần
      for (let i = 0; i < 3; i++) {
        finalCode = genCode();
        if (!(await this.repo.findOne({ where: { code: finalCode } }))) break;
      }
    }

    const entity = this.repo.create({ code: finalCode, product });
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException('QR not found');
    await this.repo.remove(found);
    return { deleted: true, id };
  }

  async findByCode(code: string) {
    const qr = await this.repo.findOne({ where: { code }, relations: ['product'] });
    if (!qr) throw new NotFoundException('QR not found');
    return qr;
  }
}
