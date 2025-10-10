// src/public/public.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScanLog } from '../entities/scanlog.entity';
import { Batch } from '../entities/batch.entity';
import { QRCode } from '../entities/qrcode.entity';
import { QrcodeService } from '../qrcode/qrcode.service';
import { ProcessStep } from '../entities/process-step.entity';

@Injectable()
export class PublicService {
  constructor(
    private readonly qrcodeService: QrcodeService,
    @InjectRepository(ScanLog) private readonly scanlogRepo: Repository<ScanLog>,
    @InjectRepository(Batch) private readonly batchRepo: Repository<Batch>,
    @InjectRepository(QRCode) private readonly qrRepo: Repository<QRCode>, // giữ 1 repo duy nhất
  ) {}

  async traceByCode(code: string) {
    // Load QR kèm product để chắc chắn có product.id
    const qrBasic = await this.qrcodeService.findByCode(code);
    const qrcode = await this.qrRepo.findOne({
      where: { id: qrBasic?.id ?? 0, code },
      relations: { product: true },
    });
    if (!qrcode) throw new NotFoundException('QR code không tồn tại');
    if (!qrcode.product?.id) throw new NotFoundException('Product không gắn với QR code');

    const product = qrcode.product;

    // Batches + steps
    const batches = await this.batchRepo.find({
      where: { product: { id: product.id } },
      relations: { processSteps: true },
      order: { id: 'DESC' },
    });

    for (const b of batches) {
      if (b.processSteps?.length) {
        b.processSteps.sort((a, z) => (a.stepOrder ?? 1) - (z.stepOrder ?? 1));
      }
    }

    // Logs của QR (đúng cột scannedAt)
    const logs = await this.scanlogRepo.find({
      where: { qrcode: { id: qrcode.id } },
      order: { createdAt: 'DESC' },
      take: 10,
    });
    const asDate = (v: Date | string | null | undefined) =>
      v ? (v instanceof Date ? v.toISOString().slice(0, 10) : String(v)) : null;

    const asDateTime = (v: Date | string | null | undefined) =>
      v ? (v instanceof Date ? v.toISOString() : String(v)) : null;


    // Response
    return {
      code: qrcode.code,
      product: {
        id: product.id,
        name: product.name,
        sku: product.sku ?? null,
      },
      batches: batches.map((b) => ({
        id: b.id,
        batchCode: b.batchCode,
        productionDate: asDate(b.productionDate),
        expiryDate: asDate(b.expiryDate),
        steps: (b.processSteps ?? []).map((s) => ({
          id: s.id,
          stepName: s.stepName,
          stepOrder: s.stepOrder,
          description: s.description ?? null,
          startedAt: s.startedAt?.toISOString() || null,
          finishedAt: s.finishedAt?.toISOString() || null,
        })),
      })),
      logs: logs.map((l) => ({
        id: l.id,
        scannedAt: l.createdAt.toISOString(), // dùng đúng scannedAt
        ip: l.ip ?? null,
        userAgent: l.userAgent ?? null,
      })),
    };

  }
}
