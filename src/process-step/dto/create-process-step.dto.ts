export class CreateProcessStepDto {
  batchId: number;
  stepName: string;
  description?: string;
  stepOrder?: number;
  startedAt?: string;   // ISO
  finishedAt?: string;  // ISO
  meta?: Record<string, any>;
}
