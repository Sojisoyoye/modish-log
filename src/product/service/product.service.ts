import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities';
import { ProductDto } from '../dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async getAll() {
    return await this.productRepository.find();
  }

  public async getProduct(productId: number): Promise<Product> {
    return this.productRepository.findOneByOrFail({
      id: productId,
    });
  }

  public async createProduct(productDto: ProductDto) {
    try {
      const product = await this.productRepository.create({
        ...productDto,
        unitPrize: productDto.unitPrize,
        quantityLeft: productDto.quantity,
        totalAmount: productDto.quantity * productDto.unitPrize,
      });

      return product;
    } catch (error) {
      throw new HttpException(
        `Product can not be created ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async updateProduct(productDto: ProductDto, productId: number) {
    let updatedProduct;
    try {
      const product = await this.productRepository.findOneByOrFail({
        id: productId,
      });

      if (product) {
        const newProductQuantity = product.quantity + productDto.quantity;
        const newProductQuantityLeft =
          product.quantityLeft + productDto.quantity;
        const amount = product.unitPrize * productDto.quantity;
        const newTotalAmount = product.totalAmount + amount;

        updatedProduct = await this.productRepository.update(productId, {
          ...product,
          totalAmount: newTotalAmount,
          quantity: newProductQuantity,
          quantityLeft: newProductQuantityLeft,
        });

        return updatedProduct.affected;
      }
    } catch (error) {
      throw new HttpException(
        `Product can not be created ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
