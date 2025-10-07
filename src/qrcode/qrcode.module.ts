import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QRCode } from '../entities/qrcode.entity';
import { Product } from '../entities/product.entity';
import { QrcodeService } from './qrcode.service';
import { QrcodeController } from './qrcode.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QRCode, Product])],
  providers: [QrcodeService],
  controllers: [QrcodeController],
  exports: [QrcodeService], 
})
export class QrcodeModule {}
