import { Controller, Post, Body, Get } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './sales.entity';

@Controller('api/sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async createSale(
    @Body('productId') productId: number,
    @Body('quantitySold') quantitySold: number,
  ): Promise<Sale> {
    return this.salesService.createSale(productId, quantitySold);
  }

  @Get()
  async findAll(): Promise<Sale[]> {
    return this.salesService.findAll();
  }
}