"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("../products/products.entity");
const stock_count_entity_1 = require("./stock-count.entity");
const stock_balance_report_entity_1 = require("./stock-balance-report.entity");
let StockService = class StockService {
    constructor(productRepository, stockCountRepository, stockBalanceReportRepository) {
        this.productRepository = productRepository;
        this.stockCountRepository = stockCountRepository;
        this.stockBalanceReportRepository = stockBalanceReportRepository;
    }
    async createStockCount(createStockCountDto) {
        const { productId, countedQuantity, countDate } = createStockCountDto;
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
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
    async generateStockBalanceReport(generateStockBalanceReportDto) {
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
        const report = [];
        for (const product of products) {
            const productStockCounts = stockCounts.filter((sc) => sc.product.id === product.id);
            const totalCountedQuantity = productStockCounts.reduce((sum, sc) => sum + sc.countedQuantity, 0);
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
};
exports.StockService = StockService;
exports.StockService = StockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(stock_count_entity_1.StockCount)),
    __param(2, (0, typeorm_1.InjectRepository)(stock_balance_report_entity_1.StockBalanceReport)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StockService);
