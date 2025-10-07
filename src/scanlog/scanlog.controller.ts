import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ScanlogService } from './scanlog.service';
import { CreateScanLogDto } from './dto/create-scanlog.dto';

@Controller('scanlog')
export class ScanlogController {
  constructor(private readonly service: ScanlogService) {}

  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.findAll(Number(limit), Number(offset)); // ✅ hàm tồn tại
  }

  @Post()
  create(@Body() dto: CreateScanLogDto) {
    return this.service.create(dto);
  }

  @Get('by-qr/:qrId')
  listByQr(@Param('qrId') qrId: string) {
    return this.service.listByQrId(Number(qrId));
  }

  @Post('by-code/:code')
  createByCode(
    @Param('code') code: string,
    @Body() body: { location?: string; device?: string; ip?: string; userAgent?: string },
  ) {
    return this.service.createByCode(code, body.location, body.device, body.ip, body.userAgent);
  }
}
