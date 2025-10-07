import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QRCode } from '../entities/qrcode.entity';
import { Product } from '../entities/product.entity';
import { Batch } from '../entities/batch.entity';
import { ScanLog } from '../entities/scanlog.entity';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { QrcodeModule } from '../qrcode/qrcode.module';  // ✅

@Module({
  imports: [
    TypeOrmModule.forFeature([QRCode, Product, Batch, ScanLog]),
    QrcodeModule,                                        // ✅ bắt buộc
  ],
  providers: [PublicService],
  controllers: [PublicController],
})
export class PublicModule {}
