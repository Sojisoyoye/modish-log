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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sales_entity_1 = require("./sales.entity");
const products_entity_1 = require("../products/products.entity");
const utils_1 = require("../users/utils");
let SalesService = class SalesService {
    constructor(salesRepository, productsRepository) {
        this.salesRepository = salesRepository;
        this.productsRepository = productsRepository;
    }
    async createSale(createSaleDto) {
        const product = await this.productsRepository.findOne({
            where: { id: createSaleDto.productId },
        });
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        const formatedProductQuantity = (0, utils_1.formatNumber)(product.quantity);
        if (createSaleDto.quantitySold === undefined) {
            throw new Error("Quantity sold is required");
        }
        const formatedQuantitySold = (0, utils_1.formatNumber)(createSaleDto.quantitySold);
        if (formatedProductQuantity < formatedQuantitySold) {
            throw new Error("Insufficient stock");
        }
        // Calculate the total price
        const totalPrice = product.price * Number(formatedQuantitySold);
        product.quantity = Number(formatedProductQuantity);
        // Update product stock
        product.quantity -= createSaleDto.quantitySold;
        await this.productsRepository.save(product);
        // Create sale record
        const sale = this.salesRepository.create({
            ...createSaleDto,
            product,
            quantitySold: Number(formatedQuantitySold),
            price: totalPrice, // Store the total price
            saleDate: new Date(),
        });
        return this.salesRepository.save(sale);
    }
    async findAll() {
        return this.salesRepository.find({ relations: ["product"] });
    }
    async findOne(id) {
        const sale = await this.salesRepository.findOne({
            where: { id },
            relations: ["product"],
        });
        return sale;
    }
    async updateSale(id, updateSaleDto) {
        const sale = await this.salesRepository.findOne({
            where: { id },
            relations: ["product"],
        });
        if (!sale) {
            throw new common_1.NotFoundException("Sale not found");
        }
        const product = await this.productsRepository.findOne({
            where: { id: sale.product.id },
        });
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        // Calculate the difference in quantity sold
        const quantityDifference = (updateSaleDto.quantitySold ?? 0) - sale.quantitySold;
        // Update the product quantity
        product.quantity -= quantityDifference;
        await this.productsRepository.save(product);
        Object.assign(sale, updateSaleDto);
        return this.salesRepository.save(sale);
    }
    async deleteSale(id) {
        const sale = await this.salesRepository.findOne({
            where: { id },
            relations: ["product"],
        });
        if (!sale) {
            throw new common_1.NotFoundException("Sale not found");
        }
        const product = await this.productsRepository.findOne({
            where: { id: sale.product.id },
        });
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        // Restore the product quantity
        const newProductQuantity = Number((0, utils_1.formatNumber)(product.quantity)) +
            Number((0, utils_1.formatNumber)(sale.quantitySold));
        await this.productsRepository.save({
            ...product,
            quantity: newProductQuantity,
        });
        // Delete the sale
        const result = await this.salesRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sales_entity_1.Sale)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SalesService);
