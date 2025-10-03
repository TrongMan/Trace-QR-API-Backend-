// src/batch/batch.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Batch } from '../entities/batch.entity';
import { Product } from '../entities/product.entity';

import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Batch, Product])],
  controllers: [BatchController],
  providers: [BatchService],
  exports: [BatchService], // cần nếu module khác dùng service này
})
export class BatchModule {}
