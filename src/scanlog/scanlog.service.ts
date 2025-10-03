import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScanLog } from '../entities/scanlog.entity';
import { QRCode } from '../entities/qrcode.entity';
import { CreateScanLogDto } from './dto/create-scanlog.dto';

@Injectable()
export class ScanlogService {
  constructor(
    @InjectRepository(ScanLog) private readonly repo: Repository<ScanLog>,
    @InjectRepository(QRCode) private readonly qrRepo: Repository<QRCode>,
  ) {}

  findAll() { return this.repo.find({ relations: ['qrcode'] }); }

  async create(dto: CreateScanLogDto) {
    const qr = await this.qrRepo.findOne({ where: { id: dto.qrcodeId } });
    if (!qr) throw new NotFoundException('qr not found');
    const entity = this.repo.create({ qrcode: qr, location: dto.location, device: dto.device });
    return this.repo.save(entity);
  }
}
