import { Controller, Get, Post, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';

@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly svc: QrcodeService) {}

  @Get() findAll() { return this.svc.findAll(); }

  @Post(':productId')
  create(@Param('productId', ParseIntPipe) pid: number) {
    return this.svc.createForProduct(pid);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
