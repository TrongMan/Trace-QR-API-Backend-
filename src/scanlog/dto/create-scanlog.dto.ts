import { IsInt, IsOptional, IsString, IsObject, IsIP } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScanLogDto {
  @IsInt()
  @Type(() => Number)
  qrcodeId: number;

  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() device?: string;

  // Gợi ý: Dùng @IsIP() để validate địa chỉ IP tốt hơn
  @IsOptional()
  @IsIP()
  ip?: string;

  @IsOptional() @IsString() userAgent?: string;

  // Thêm thuộc tính này vào để sửa lỗi
  @IsOptional()
  @IsObject()
  meta?: object;
}