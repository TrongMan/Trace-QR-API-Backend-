import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

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
      host: 'localhost',
      port: 5500,
      username: 'postgres',
      password: '123456',
      database: 'traceqr',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ chỉ nên dùng ở dev
    }),
    UserModule,
    ProductModule,
    QrcodeModule,
    ScanlogModule,
    BatchModule,
  ],
})
export class AppModule {}
