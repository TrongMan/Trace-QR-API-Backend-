import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';

import { ScanLog } from '../entities/scanlog.entity';
import { Batch } from '../entities/batch.entity';
import { ProcessStep } from '../entities/process-step.entity';
// + thêm
import { QRCode } from '../entities/qrcode.entity';
import { QrcodeModule } from '../qrcode/qrcode.module'; // nếu PublicService dùng QrcodeService
imports: [
  TypeOrmModule.forFeature([ScanLog, Batch, ProcessStep, QRCode]),
  QrcodeModule, // để inject QrcodeService
] 

@Module({
  imports: [
    TypeOrmModule.forFeature([ScanLog, Batch, ProcessStep, QRCode]), // + QRCode
    QrcodeModule, // giữ nếu dùng QrcodeService
  ],
  controllers: [PublicController],
  providers: [PublicService],
  exports: [PublicService],
})
export class PublicModule {}
