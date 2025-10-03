import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScanLog } from '../entities/scanlog.entity';
import { QRCode } from '../entities/qrcode.entity';
import { ScanlogService } from './scanlog.service';
import { ScanlogController } from './scanlog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ScanLog, QRCode])],
  providers: [ScanlogService],
  controllers: [ScanlogController],
})
export class ScanlogModule {}
