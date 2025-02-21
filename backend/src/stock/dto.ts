export class CreateStockCountDto {
  productId!: string;
  countedQuantity!: number;
  countDate!: Date;
}

export class GenerateStockBalanceReportDto {
  startDate!: Date;
  endDate!: Date;
}

export class StockBalanceReportResponseDto {
  productId!: string;
  productColor!: string;
  productSize!: string;
  expectedQuantity!: number;
  actualQuantity!: number;
  difference!: number;
  status!: string; // "Short" or "Excess"
}
