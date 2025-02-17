import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./products.entity";
import { formatNumber } from "../users/utils";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product | null> {
    const product = await this.productsRepository.findOne({ where: { id } });
    return product;
  }

  async create(product: Partial<Product>): Promise<Product> {
    const newProduct = this.productsRepository.create(product);
    const formatedProductQuantity  = formatNumber(newProduct.quantity);
    return this.productsRepository.save({ ...newProduct, quantity: Number(formatedProductQuantity) });
  }

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    await this.productsRepository.update(id, product);
    return this.productsRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
