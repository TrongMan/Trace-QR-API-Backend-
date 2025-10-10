import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProcessStepService } from './process-step.service';
import { CreateProcessStepDto } from './dto/create-process-step.dto';
import { UpdateProcessStepDto } from './dto/update-process-step.dto';

@Controller('process-step')
export class ProcessStepController {
  constructor(private readonly processStepService: ProcessStepService) {}

  // POST /process-step
  @Post()
  create(@Body() dto: CreateProcessStepDto) {
    return this.processStepService.create(dto);
  }

  // GET /process-step
  @Get()
  findAll() {
    return this.processStepService.findAll();
  }

  // GET /process-step/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.processStepService.findOne(id);
  }

  // PATCH /process-step/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProcessStepDto,
  ) {
    return this.processStepService.update(id, dto);
  }

  // DELETE /process-step/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.processStepService.remove(id);
  }
}
