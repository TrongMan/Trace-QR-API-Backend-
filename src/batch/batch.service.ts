import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Batch } from '../entities/batch.entity';
import { Product } from '../entities/product.entity';

import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';

@Injectable()
export class BatchService {
  constructor(
    @InjectRepository(Batch) private readonly repo: Repository<Batch>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateBatchDto) {
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('product not found');

    const entity = this.repo.create({
      batchCode: dto.batchCode,
      productionDate: new Date(dto.productionDate),
      expiryDate: new Date(dto.expiryDate),
      product,
    });
    return this.repo.save(entity);
  }

  async findAll(page = 1, limit = 10, productId?: number) {
    const qb = this.repo
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.product', 'p')
      .orderBy('b.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (productId) qb.andWhere('b.productId = :pid', { pid: productId });

    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }

  async findOne(id: number) {
    const b = await this.repo.findOne({ where: { id }, relations: ['product'] });
    if (!b) throw new NotFoundException('batch not found');
    return b;
  }

  async update(id: number, dto: UpdateBatchDto) {
    const b = await this.findOne(id);

    if (dto.productId) {
      const p = await this.productRepo.findOne({ where: { id: dto.productId } });
      if (!p) throw new NotFoundException('product not found');
      b.product = p;
    }
    if (dto.batchCode !== undefined) b.batchCode = dto.batchCode;
    if (dto.productionDate !== undefined) b.productionDate = new Date(dto.productionDate);
    if (dto.expiryDate !== undefined) b.expiryDate = new Date(dto.expiryDate);

    return this.repo.save(b);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { deleted: true };
  }
}
