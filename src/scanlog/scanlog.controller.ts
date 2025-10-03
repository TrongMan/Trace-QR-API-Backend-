import { Controller, Get, Post, Body } from '@nestjs/common';
import { ScanlogService } from './scanlog.service';
import { CreateScanLogDto } from './dto/create-scanlog.dto';

@Controller('scanlog')
export class ScanlogController {
  constructor(private readonly svc: ScanlogService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Post()
  create(@Body() dto: CreateScanLogDto) { return this.svc.create(dto); }
}
