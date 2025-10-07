
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScanLogDto {
  @IsInt()
  @Type(() => Number)
  qrcodeId: number;

  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() device?: string;
  @IsOptional() @IsString() ip?: string;
  @IsOptional() @IsString() userAgent?: string;
}
