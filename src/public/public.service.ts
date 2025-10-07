import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrcodeService } from '../qrcode/qrcode.service';
import { ScanLog } from '../entities/scanlog.entity';
import { Batch } from '../entities/batch.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class PublicService {
  constructor(
    private readonly qrcodeService: QrcodeService,
    @InjectRepository(ScanLog) private readonly logRepo: Repository<ScanLog>,
    @InjectRepository(Batch) private readonly batchRepo: Repository<Batch>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) {}

  async traceByCode(code: string) {
    const qr = await this.qrcodeService.findByCode(code); // phải trả về kèm product
    if (!qr) throw new NotFoundException('QR code không tồn tại');
    if (!qr.product?.id) throw new NotFoundException('Product không gắn với QR code');

    const product = await this.productRepo.findOne({
      where: { id: qr.product.id },
      relations: { qrcodes: true }, // mở khi đã khai báo @OneToMany
    });

    const batches = await this.batchRepo.find({
      where: { product: { id: qr.product.id } },
      order: { id: 'DESC' },
      take: 5,
    });

   const logs = await this.logRepo.find({
      where: { qrcode: { id: qr.id } },  // thay vì { qrcode: { id: qr.id } }
      order: { id: 'DESC' },
      take: 5,
    });   

    return {
      code: qr.code,
      product: product
        ? {
            id: product.id,
            name: (product as unknown as { name?: string }).name ?? null,
            sku: (product as unknown as { sku?: string }).sku ?? null,
          }
        : null,
      batches: batches.map((b) => ({
        id: b.id,
        lotNo: (b as unknown as { lotNo?: string }).lotNo ?? null,
        createdAt: (b as unknown as { createdAt?: Date }).createdAt ?? null,
      })),
      logs: logs.map((l) => ({
        id: l.id,
        scannedAt:
          (l as unknown as { scannedAt?: Date }).scannedAt ??
          (l as Record<string, any>)['createdAt'] ??
          null,
        ip: (l as unknown as { ip?: string }).ip ?? null,
        ua:
          (l as unknown as { userAgent?: string }).userAgent ??
          (l as unknown as { ua?: string }).ua ??
          null,
      })),
    };
  }
}
