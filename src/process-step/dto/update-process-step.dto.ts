export class UpdateProcessStepDto {
  stepName?: string;
  description?: string;
  stepOrder?: number;
  startedAt?: string;
  finishedAt?: string;
  meta?: Record<string, any>;
}
