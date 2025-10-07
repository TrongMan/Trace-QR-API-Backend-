import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { QRCode } from './entities/qrcode.entity';
import { ScanLog } from './entities/scanlog.entity';
import { Batch } from './entities/batch.entity';

// Feature modules
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { ScanlogModule } from './scanlog/scanlog.module';
import { PublicModule } from './public/public.module';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // ví dụ: postgresql://postgres:123456@localhost:5500/traceqr
      entities: [User, Product, QRCode, ScanLog, Batch],
      synchronize: false,
      autoLoadEntities: true,
      logging: false,
    }),
    UserModule,
    ProductModule,
    QrcodeModule,
    ScanlogModule,
    PublicModule,
    BatchModule,
  ],
})
export class AppModule {}
