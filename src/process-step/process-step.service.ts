import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessStep } from '../entities/process-step.entity';
import { Batch } from '../entities/batch.entity';
import { CreateProcessStepDto } from './dto/create-process-step.dto';
import { UpdateProcessStepDto } from './dto/update-process-step.dto';

@Injectable()
export class ProcessStepService {
  constructor(
    @InjectRepository(ProcessStep)
    private readonly repo: Repository<ProcessStep>,

    @InjectRepository(Batch)
    private readonly batchRepo: Repository<Batch>,
  ) {}

  async create(dto: CreateProcessStepDto) {
    const batch = await this.batchRepo.findOneByOrFail({ id: dto.batchId });
    const step = this.repo.create({
      batch,
      stepName: dto.stepName,
      stepOrder: dto.stepOrder ?? 1,
      description: dto.description,
      startedAt: dto.startedAt ? new Date(dto.startedAt) : undefined,
      finishedAt: dto.finishedAt ? new Date(dto.finishedAt) : undefined,
      meta: dto.meta ?? {},
    });
    return this.repo.save(step);
  }

  async findAll() {
    return this.repo.find({ relations: ['batch'] });
  }

  async findOne(id: number) {
    const step = await this.repo.findOne({ where: { id }, relations: ['batch'] });
    if (!step) throw new NotFoundException(`ProcessStep #${id} not found`);
    return step;
  }

  async update(id: number, dto: UpdateProcessStepDto) {
    const step = await this.findOne(id);
    Object.assign(step, dto);
    return this.repo.save(step);
  }

  async remove(id: number) {
    const step = await this.findOne(id);
    return this.repo.remove(step);
  }
}
