// src/data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // Hoạt động cả khi chạy bằng ts-node (src) lẫn sau khi build (dist)
  entities: [join(__dirname, 'entities', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
  migrationsTableName: 'migrations_v2',
  synchronize: false,
  logging: true,
});

export default dataSource;
