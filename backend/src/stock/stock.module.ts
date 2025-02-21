import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { Product } from '../products/products.entity';
import { StockCount } from './stock-count.entity';
import { StockBalanceReport } from './stock-balance-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, StockCount, StockBalanceReport]),
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}