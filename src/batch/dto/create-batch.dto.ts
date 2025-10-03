import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';
export class CreateBatchDto {
  @IsNotEmpty() batchCode: string;
  @IsDateString() productionDate: string;
  @IsDateString() expiryDate: string;
  @IsInt() productId: number;
}
