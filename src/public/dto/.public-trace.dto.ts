// src/public/dto/public-trace.dto.ts
export class PublicTraceStepDto {
  id: number;
  stepName: string;
  stepOrder?: number;
  description?: string;
  startedAt?: string | null;
  finishedAt?: string | null;
}

export class PublicTraceBatchDto {
  id: number;
  batchCode: string;
  productionDate?: string | null;
  expiryDate?: string | null;
  steps: PublicTraceStepDto[];
}

export class PublicTraceProductDto {
  id: number;
  name: string;
  sku?: string | null;
}

export class PublicTraceLogDto {
  id: number;
  scannedAt: string;
  ip?: string | null;
  userAgent?: string | null;
}

export class PublicTraceDto {
  code: string;
  product: PublicTraceProductDto;
  batches: PublicTraceBatchDto[];
  logs: PublicTraceLogDto[];
}
