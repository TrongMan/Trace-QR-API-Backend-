import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

type ProductDto = Partial<Product> & { ownerId?: number };

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['owner', 'batches', 'qrcodes'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['owner', 'batches', 'qrcodes'],
    });
  }

  create(dto: ProductDto) {
    const entity = this.repo.create({
      ...dto,
      owner: dto.ownerId ? ({ id: dto.ownerId } as any) : undefined,
    });
    return this.repo.save(entity);
  }

  async update(id: number, dto: ProductDto) {
    const entity = this.repo.create({
      id,
      ...dto,
      owner: dto.ownerId ? ({ id: dto.ownerId } as any) : undefined,
    });
    await this.repo.save(entity);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { deleted: true };
  }
}
