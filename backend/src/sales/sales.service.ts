import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sales.entity';
import { Product } from '../products/products.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createSale(productId: number, quantitySold: number): Promise<Sale> {
    const product = await this.productsRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.quantity < quantitySold) {
      throw new Error('Insufficient stock');
    }

    // Calculate the total price
    const totalPrice = product.price * quantitySold;

    // Update product stock
    product.quantity -= quantitySold;
    await this.productsRepository.save(product);

    // Create sale record
    const sale = this.salesRepository.create({
      product,
      quantitySold,
      price: totalPrice, // Store the total price
      saleDate: new Date(),
    });
    return this.salesRepository.save(sale);
  }

  async findAll(): Promise<Sale[]> {
    return this.salesRepository.find({ relations: ['product'] });
  }
}