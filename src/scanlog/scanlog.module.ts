import { Module } from '@nestjs/common';
import { ScanlogService } from './scanlog.service';
import { ScanlogController } from './scanlog.controller';

@Module({
  providers: [ScanlogService],
  controllers: [ScanlogController]
})
export class ScanlogModule {}
