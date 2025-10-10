import { IsInt, IsOptional, IsString, Min, IsDateString } from 'class-validator';

export class CreateProcessStepDto {
  @IsInt()
  batchId: number;

  @IsString()
  stepName: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  stepOrder?: number = 1;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @IsOptional()
  @IsDateString()
  finishedAt?: string;

  @IsOptional()
  meta?: any;
}
