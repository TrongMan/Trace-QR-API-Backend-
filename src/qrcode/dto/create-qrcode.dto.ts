import { IsInt, IsOptional, IsString, Min } from 'class-validator';
export class CreateQRCodeDto {
  @IsInt() @Min(1) productId: number;
  @IsOptional() @IsString() code?: string;
}
