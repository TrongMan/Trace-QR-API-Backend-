import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { QRCode } from './entities/qrcode.entity';
import { ScanLog } from './entities/scanlog.entity';
import { Batch } from './entities/batch.entity';

import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { ScanlogModule } from './scanlog/scanlog.module';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      entities: [User, Product, QRCode, ScanLog, Batch],
      synchronize: false,
    }),
    UserModule,
    ProductModule,
    QrcodeModule,
    ScanlogModule,
    BatchModule,
  ],
})
export class AppModule {}
