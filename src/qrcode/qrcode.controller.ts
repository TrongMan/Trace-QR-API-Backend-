import { Controller, Get, Post, Param, ParseIntPipe, Delete, Body, Query } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { CreateQRCodeDto } from './dto/create-qrcode.dto';

@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly svc: QrcodeService) {}

  // GET /qrcode?limit=50&offset=0
  @Get()
  findAll(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.svc.findAll(Number(limit) || 50, Number(offset) || 0);
  }

  // POST /qrcode  { productId, code? }
  @Post()
  create(@Body() dto: CreateQRCodeDto) {
    return this.svc.createForProduct(dto.productId, dto.code);
  }

  // GET /qrcode/:code
  @Get(':code')
  findByCode(@Param('code') code: string) {
    return this.svc.findByCode(code);
  }

  // DELETE /qrcode/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
