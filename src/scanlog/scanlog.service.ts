import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScanLog } from '../entities/scanlog.entity';
import { QRCode } from '../entities/qrcode.entity';
import { CreateScanLogDto } from './dto/create-scanlog.dto';

@Injectable()
export class ScanlogService {
  constructor(
    @InjectRepository(ScanLog) private readonly scanlogRepo: Repository<ScanLog>,
    @InjectRepository(QRCode) private readonly qrcodeRepo: Repository<QRCode>,
  ) {}

  async findAll(limit = 50, offset = 0) {
    const take = Math.min(Math.max(+limit || 1, 1), 200);
    const skip = Math.max(+offset || 0, 0);
    const [items, total] = await this.scanlogRepo.findAndCount({
      relations: { qrcode: true },
      order: { id: 'DESC' },
      take,
      skip,
    });
    return { total, items };
  }

  async create(dto: CreateScanLogDto) {
    if (!dto?.qrcodeId) throw new BadRequestException('qrcodeId is required');

    const qr = await this.qrcodeRepo.findOne({ where: { id: dto.qrcodeId } });
    if (!qr) throw new NotFoundException('qr not found');

    const entity = new ScanLog();
      entity.qrcode = { id: dto.qrcodeId } as any;
      entity.location  = dto.location ?? null;
      entity.device    = dto.device ?? null;
      entity.ip        = dto.ip ?? null;
      entity.userAgent = dto.userAgent ?? null;
  
return this.scanlogRepo.save(entity);
  }

  async listByQrId(qrId: number) {
    if (!qrId || qrId < 1) throw new BadRequestException('invalid qrId');
    return this.scanlogRepo.find({
      where: { qrcode: { id: qrId } },
      order: { id: 'DESC' },
    });
  }

  async createByCode(code: string, location?: string, device?: string, ip?: string, userAgent?: string) {
    if (!code) throw new BadRequestException('code is required');

    const qr = await this.qrcodeRepo.findOne({ where: { code } });
    if (!qr) throw new NotFoundException('qr not found');

    const entity = new ScanLog();
      entity.qrcode = qr;
      entity.location  = location ?? null;
      entity.device    = device ?? null;
      entity.ip        = ip ?? null;
      entity.userAgent = userAgent ?? null;
   
    return this.scanlogRepo.save(entity);
  }
}
