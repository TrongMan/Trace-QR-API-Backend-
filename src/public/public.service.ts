import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { QrcodeService } from '../qrcode/qrcode.service';
import { ScanLog } from '../entities/scanlog.entity';
import { Batch } from '../entities/batch.entity';
import { ProcessStep } from '../entities/process-step.entity';

@Injectable()
export class PublicService {
  constructor(
    private readonly qrcodeService: QrcodeService,
    @InjectRepository(ScanLog) private readonly logRepo: Repository<ScanLog>,
    @InjectRepository(Batch) private readonly batchRepo: Repository<Batch>,
    @InjectRepository(ProcessStep) private readonly stepRepo: Repository<ProcessStep>, 
  ) {}

  async traceByCode(code: string) {
    const qr = await this.qrcodeService.findByCode(code);
    if (!qr) {
      throw new NotFoundException('QR code không tồn tại');
    }
    if (!qr.product?.id) {
      throw new NotFoundException('Product không gắn với QR code');
    }

    const batches = await this.batchRepo.find({
      where: { product: { id: qr.product.id } },
      order: { id: 'DESC' },
      take: 5,
    });

    const logs = await this.logRepo.find({
      where: { qrcode: { id: qr.id } },
      order: { createdAt: 'DESC' }, // Sắp xếp theo thời gian quét
      take: 5,
    });

    // --- PHẦN LOGIC MỚI ĐỂ LẤY PROCESS STEPS ---
    let stepsByBatchId: Record<number, ProcessStep[]> = {};
    if (batches.length > 0) {
      const batchIds = batches.map((b) => b.id);

  
      const allSteps = await this.stepRepo.find({
        where: {
          batch: { id: In(batchIds) }, // Dùng toán tử In() là cách làm chuẩn của TypeORM
        },
        order: {
          stepOrder: 'ASC', // Sắp xếp các bước theo đúng thứ tự
          id: 'ASC',
        },
      });

      
      for (const step of allSteps) {
        if (!stepsByBatchId[step.batchId]) {
          stepsByBatchId[step.batchId] = [];
        }
        stepsByBatchId[step.batchId].push(step);
      }
    }
    

    return {
      code: qr.code,
      product: {
        id: qr.product.id,
        name: qr.product.name,
        sku: qr.product.sku,
      },
      batches: batches.map((batch) => ({
        id: batch.id,
        batchCode: batch.batchCode,
        productionDate: batch.productionDate,
        expiryDate: batch.expiryDate,
        
        steps: (stepsByBatchId[batch.id] || []).map((s) => ({
          id: s.id,
          stepName: s.stepName,
          description: s.description,
          stepOrder: s.stepOrder,
          startedAt: s.startedAt,
          finishedAt: s.finishedAt,
          meta: s.meta,
          timestamp: s.createdAt,
        })),
      })),
      logs: logs.map((log) => ({
        id: log.id,
        scannedAt: log.createdAt,
        ip: log.ip,
        userAgent: log.userAgent,
      })),
    };
  }
}