import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  @IsUUID()
  productId?: string;

  @IsNumber()
  @Min(0)
  quantitySold?: number;

  @IsBoolean()
  @IsOptional()
  paid?: boolean;

  @IsString()
  @IsOptional()
  comment?: string;
}


export class UpdateSaleDto {
  @IsNumber()
  @IsOptional()
  quantitySold?: number;

  // @IsNumber()
  // @IsOptional()
  // price?: number;

  @IsBoolean()
  @IsOptional()
  paid?: boolean;

  @IsString()
  @IsOptional()
  comment?: string;
}