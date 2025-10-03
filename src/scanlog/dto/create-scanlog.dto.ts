import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateScanLogDto {
  @IsInt()
  qrcodeId: number;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  device?: string;
}
