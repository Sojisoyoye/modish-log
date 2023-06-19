import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from 'src/entities/sale.entity';
import { SaleDto } from '../dto';
import { Product } from 'src/entities';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async getAll(): Promise<Sale[]> {
    return await this.saleRepository.find();
  }

  public async getSale(saleId: number): Promise<Sale> {
    return this.saleRepository.findOneByOrFail({
      id: saleId,
    });
  }

  public async createSale(saleDto: SaleDto) {
    const product = await this.getProductByNameSizeAndFaced(
      saleDto.productName,
      saleDto.faced,
      saleDto.size,
    );

    if (product.quantityLeft === 0) {
      throw new HttpException(
        'Product not available in stock',
        HttpStatus.NOT_FOUND,
      );
    } else {
      const productAmountSold = product.amountSold + saleDto.amount;
      const productQuantitySold = product.quantitySold
        ? product.quantitySold + saleDto.quantity
        : saleDto.quantity;
      const productQuantityLeft = product.quantityLeft - saleDto.quantity;

      await this.updateProduct(product.id, {
        ...product,
        amountSold: productAmountSold,
        quantitySold: productQuantitySold,
        quantityLeft: productQuantityLeft,
      });
      const newSale = this.saleRepository.create(saleDto);

      return newSale;
    }
  }

  private async getProductByNameSizeAndFaced(
    name: string,
    faced: string,
    size: string,
  ) {
    try {
      const product = await this.productRepository.findOneByOrFail({
        name: name,
        faced: faced,
        size: size,
      });

      return product;
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  private async updateProduct(id: number, newProduct: any) {
    const updatedProduct = await this.productRepository.update(id, {
      ...newProduct,
    });

    return updatedProduct.affected;
  }
}
