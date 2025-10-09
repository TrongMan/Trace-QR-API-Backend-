import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity'; // Import User để có kiểu dữ liệu tường minh

// Định nghĩa DTO rõ ràng hơn để validation sau này
export class ProductDto {
  name?: string;
  sku?: string;
  ownerId?: number;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['owner', 'batches', 'qrcodes'] });
  }

  async findOne(id: number) {
    const product = await this.repo.findOne({
      where: { id },
      relations: ['owner', 'batches', 'qrcodes'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  create(dto: ProductDto) {
    const entity = this.repo.create({
      name: dto.name,
      sku: dto.sku,
      owner: dto.ownerId ? ({ id: dto.ownerId } as User) : undefined,
    });
    return this.repo.save(entity);
  }

  async update(id: number, dto: ProductDto) {
  
    const updatePayload: Partial<Product> = { ...dto };
    if (dto.ownerId) {
      updatePayload.owner = { id: dto.ownerId } as User;
    }

    await this.repo.update(id, updatePayload);

   
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id); 
    await this.repo.delete(id);
    return { deleted: true, id };
  }
}