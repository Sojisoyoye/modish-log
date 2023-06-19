import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities';
import { Sale } from 'src/entities/sale.entity';
import { SaleController } from './controller/sale.controller';
import { SaleService } from './service/sale.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Product])],
  providers: [SaleService],
  controllers: [SaleController],
  exports: [],
})
export class SaleModule {}
