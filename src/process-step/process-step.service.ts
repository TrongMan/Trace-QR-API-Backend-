import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessStep } from '../entities/process-step.entity';
import { CreateProcessStepDto } from './dto/create-process-step.dto';
import { UpdateProcessStepDto } from './dto/update-process-step.dto';

@Injectable()
export class ProcessStepService {
  constructor(@InjectRepository(ProcessStep) private repo: Repository<ProcessStep>) {}

  async create(dto: CreateProcessStepDto) {
    const step = this.repo.create({
      ...dto,
      startedAt: dto.startedAt ? new Date(dto.startedAt) : undefined,
      finishedAt: dto.finishedAt ? new Date(dto.finishedAt) : undefined,
    });
    return this.repo.save(step);
  }

  async findAll(batchId?: number) {
    return this.repo.find({
      where: batchId ? { batchId } : {},
      order: { stepOrder: 'ASC', id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const step = await this.repo.findOne({ where: { id } });
    if (!step) throw new NotFoundException('Process step not found');
    return step;
  }

  async update(id: number, dto: UpdateProcessStepDto) {
    const step = await this.findOne(id);
    Object.assign(step, {
      ...dto,
      startedAt: dto.startedAt ? new Date(dto.startedAt) : step.startedAt,
      finishedAt: dto.finishedAt ? new Date(dto.finishedAt) : step.finishedAt,
    });
    return this.repo.save(step);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { deleted: true };
  }
}
