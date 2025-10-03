// src/seeds/seed.ts
import dataSource from '../data-source';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { Batch } from '../entities/batch.entity';
import { QRCode } from '../entities/qrcode.entity';
import { ScanLog } from '../entities/scanlog.entity';

async function seed() {
  const ds = await dataSource.initialize();

  try {
    // 1) Xóa dữ liệu theo thứ tự phụ thuộc (con -> cha)
    await ds.getRepository(ScanLog).createQueryBuilder().delete().execute();
    await ds.getRepository(QRCode).createQueryBuilder().delete().execute();
    await ds.getRepository(Batch).createQueryBuilder().delete().execute();
    await ds.getRepository(Product).createQueryBuilder().delete().execute();
    await ds.getRepository(User).createQueryBuilder().delete().execute();

    // 2) Insert dữ liệu mẫu
    const userRepo = ds.getRepository(User);
    const productRepo = ds.getRepository(Product);
    const batchRepo = ds.getRepository(Batch);
    const qrRepo = ds.getRepository(QRCode);
    const logRepo = ds.getRepository(ScanLog);

    const admin = userRepo.create({
      username: 'admin',
      password: '123456', // nên hash trong thực tế
      role: 'admin',
    });
    await userRepo.save(admin);

    const user1 = userRepo.create({
      username: 'user1',
      password: '123456',
      role: 'user',
    });
    await userRepo.save(user1);

    const p1 = productRepo.create({
      name: 'Sản phẩm A',
      sku: 'SP-A001',
      owner: admin,
    });
    await productRepo.save(p1);

    const b1 = batchRepo.create({
      batchCode: 'BATCH-001',
      productionDate: new Date('2025-01-01'),
      expiryDate: new Date('2026-01-01'),
      product: p1,
    });
    await batchRepo.save(b1);

    const qr1 = qrRepo.create({
      code: 'QR-SPA001-01',
      product: p1,
    });
    await qrRepo.save(qr1);

    const log1 = logRepo.create({
      location: 'Hà Nội',
      device: 'iPhone 15',
      qrcode: qr1,
    });
    await logRepo.save(log1);

    console.log('✅ Seed dữ liệu mẫu thành công!');
  } catch (err) {
    console.error('❌ Lỗi seed dữ liệu:', err);
  } finally {
    await ds.destroy();
  }
}

seed();
