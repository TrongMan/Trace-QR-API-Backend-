import { Controller, Get, Param } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly svc: PublicService) {}

  @Get('trace/:code')
  trace(@Param('code') code: string) {
    return this.svc.traceByCode(code);
  }
}
