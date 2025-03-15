import { Controller, Post, Body, Get } from "@nestjs/common";
import { StockService } from "./stock.service";
import { CreateStockCountDto, GenerateStockBalanceReportDto } from "./dto";

@Controller("api/stock")
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post("counts")
  async createStockCount(@Body() createStockCountDto: CreateStockCountDto) {
    return await this.stockService.createStockCount(createStockCountDto);
  }

  @Get("counts")
  async getStockCounts() {
    return await this.stockService.getStockCounts();
  }

  @Post("balance-reports")
  async generateStockBalanceReport(
    @Body() generateStockBalanceReportDto: GenerateStockBalanceReportDto
  ) {
    return await this.stockService.generateStockBalanceReport(
      generateStockBalanceReportDto
    );
  }

  @Get("balance-reports")
  async getStockBalanceReports() {
    return await this.stockService.getStockBalanceReports();
  }
}
