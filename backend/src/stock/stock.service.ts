import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/products.entity';
import { StockCount } from './stock-count.entity';
import { StockBalanceReport } from './stock-balance-report.entity';
import { CreateStockCountDto, GenerateStockBalanceReportDto, StockBalanceReportResponseDto } from './dto';


@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(StockCount)
    private stockCountRepository: Repository<StockCount>,
    @InjectRepository(StockBalanceReport)
    private stockBalanceReportRepository: Repository<StockBalanceReport>,
  ) {}

  async createStockCount(createStockCountDto: CreateStockCountDto) {
    const { productId, countedQuantity, countDate } = createStockCountDto;

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const stockCount = this.stockCountRepository.create({
      countedQuantity,
      countDate,
      product,
    });

    return await this.stockCountRepository.save(stockCount);
  }

  async getStockCounts() {
    return await this.stockCountRepository.find({
      relations: ['product'],
    });
  }

  async generateStockBalanceReport(
    generateStockBalanceReportDto: GenerateStockBalanceReportDto,
  ): Promise<StockBalanceReportResponseDto[]> {
    const { startDate, endDate } = generateStockBalanceReportDto;

    // Fetch all products
    const products = await this.productRepository.find();

    // Fetch stock counts for the period
    const stockCounts = await this.stockCountRepository
      .createQueryBuilder('stockCount')
      .where('stockCount.count_date BETWEEN :start_date AND :end_date', {
        startDate,
        endDate,
      })
      .getMany();

    // Generate report
    const report: StockBalanceReportResponseDto[] = [];

    for (const product of products) {
      const productStockCounts = stockCounts.filter(
        (sc) => sc.product.id === product.id,
      );

      const totalCountedQuantity = productStockCounts.reduce(
        (sum, sc) => sum + sc.countedQuantity,
        0,
      );

      const difference = totalCountedQuantity - product.quantity;
      const status = difference < 0 ? 'Short' : 'Excess';

      report.push({
        productId: product.id,
        productColor: product.color,
        productSize: product.size,
        expectedQuantity: product.quantity,
        actualQuantity: totalCountedQuantity,
        difference,
        status,
      });

      // Save the report to the database
      const stockBalanceReport = this.stockBalanceReportRepository.create({
        expectedQuantity: product.quantity,
        actualQuantity: totalCountedQuantity,
        difference,
        reportDate: new Date(),
        product,
      });
      await this.stockBalanceReportRepository.save(stockBalanceReport);
    }

    return report;
  }

  async getStockBalanceReports() {
    return await this.stockBalanceReportRepository.find({
      relations: ['product'],
    });
  }
}