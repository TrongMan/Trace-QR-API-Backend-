// src/seeds/seed.ts
import dataSource from '../data-source';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { Batch } from '../entities/batch.entity';
import { QRCode } from '../entities/qrcode.entity';
import { ScanLog } from '../entities/scanlog.entity';
import { ProcessStep } from '../entities/process-step.entity';


async function seed() {
  const ds = await dataSource.initialize();

  try {
    console.log('--- Bắt đầu xóa dữ liệu cũ (dựa trên metadata) ---');

    // Lấy đúng tên bảng mà TypeORM đang dùng (tự động plural/snake theo entity)
    const tableNames = ds.entityMetadatas
      .map((m) => `"${m.tableName}"`)
      // Sắp xếp để xóa bảng con trước (đơn giản hóa: ưu tiên bảng có từ khóa dễ là con)
      .sort((a, b) => {
        const score = (t: string) =>
          (/"scan|log|step|code/i.test(t) ? 2 : 0) +
          (/"batch|qrcode/i.test(t) ? 1 : 0);
        return score(b) - score(a);
      });

    // Truncate tất cả bảng hiện có theo metadata
    await ds.query(`
      TRUNCATE TABLE
        ${tableNames.join(',\n        ')}
      RESTART IDENTITY CASCADE
    `);

    console.log('--- Xóa dữ liệu cũ thành công ---');
    console.log('--- Bắt đầu seed dữ liệu mới ---');

    const userRepo = ds.getRepository(User);
    const productRepo = ds.getRepository(Product);
    const batchRepo = ds.getRepository(Batch);
    const qrRepo = ds.getRepository(QRCode);
    const logRepo = ds.getRepository(ScanLog);
    const stepRepo = ds.getRepository(ProcessStep);

    // Users
    const admin = userRepo.create({
      email: 'admin@example.com',
      password: 'strongpassword123',
      fullName: 'Administrator',
    });
    await userRepo.save(admin);

    const user1 = userRepo.create({
      email: 'user1@example.com',
      password: 'password123',
      fullName: 'Normal User',
    });
    await userRepo.save(user1);

    // Product
    const p1 = productRepo.create({
      name: 'Táo Fuji nhập khẩu',
      sku: 'TF-2025',
      owner: admin,
    });
    await productRepo.save(p1);

    // Batch
    const b1 = batchRepo.create({
      batchCode: 'LOHANG-TF-001',
      productionDate: new Date('2025-10-01'),
      expiryDate: new Date('2026-04-01'),
      product: p1,
    });
    await batchRepo.save(b1);

    // QRCode
    const qr1 = qrRepo.create({
      code: 'FUJI-APPLE-BATCH1-QR001',
      product: p1,
    });
    await qrRepo.save(qr1);

    // ScanLog
    const log1 = logRepo.create({
      location: 'Kho lạnh, Quận 7, TP.HCM',
      device: 'Samsung Galaxy S25',
      ip: '113.161.73.100',
      userAgent: 'Mozilla/5.0...',
      qrcode: qr1,
    });
    await logRepo.save(log1);

    const s1 = stepRepo.create({
  batch: b1,
  stepName: 'Thu hoạch',
  stepOrder: 1,
  description: 'Thu hoạch tại nông trại',
});
const s2 = stepRepo.create({
  batch: b1,
  stepName: 'Đóng gói',
  stepOrder: 2,
  description: 'Đóng gói tại kho Q7',
});
await stepRepo.save([s1, s2]);

    console.log('✅ Seed dữ liệu mẫu thành công!');
  } catch (err) {
    console.error('❌ Lỗi seed dữ liệu:', err);
  } finally {
    await ds.destroy();
    console.log('--- Đóng kết nối database ---');
  }
}

seed();
