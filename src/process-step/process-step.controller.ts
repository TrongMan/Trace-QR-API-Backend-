import { Controller, Get, Post, Body, Param, Query, Patch, Delete } from '@nestjs/common';
import { ProcessStepService } from './process-step.service';
import { CreateProcessStepDto } from './dto/create-process-step.dto';
import { UpdateProcessStepDto } from './dto/update-process-step.dto';

@Controller('process-step')
export class ProcessStepController {
  constructor(private readonly svc: ProcessStepService) {}

  @Post()
  create(@Body() dto: CreateProcessStepDto) { return this.svc.create(dto); }

  @Get()
  list(@Query('batchId') batchId?: string) {
    return this.svc.findAll(batchId ? Number(batchId) : undefined);
  }

  @Get(':id')
  get(@Param('id') id: string) { return this.svc.findOne(Number(id)); }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProcessStepDto) {
    return this.svc.update(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) { return this.svc.remove(Number(id)); }
}
