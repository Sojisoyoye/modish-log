import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sale } from "./sales.entity";
import { Product } from "../products/products.entity";
import { formatNumber } from "../users/utils";
import { CreateSaleDto, UpdateSaleDto } from "./dto/dto";

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) {}

  async createSale(createSaleDto: CreateSaleDto): Promise<Sale> {
    const product = await this.productsRepository.findOne({
      where: { id: createSaleDto.productId },
    });
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    const formatedProductQuantity = formatNumber(product.quantity);
    if (createSaleDto.quantitySold === undefined) {
      throw new Error("Quantity sold is required");
    }
    const formatedQuantitySold = formatNumber(createSaleDto.quantitySold);

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

  async findAll(): Promise<Sale[]> {
    return this.salesRepository.find({ relations: ["product"] });
  }

  async findOne(id: string): Promise<Sale | null> {
    const sale = await this.salesRepository.findOne({
      where: { id },
      relations: ["product"],
    });
    return sale;
  }

  async updateSale(id: string, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const sale = await this.salesRepository.findOne({
      where: { id },
      relations: ["product"],
    });
    if (!sale) {
      throw new NotFoundException("Sale not found");
    }

    const product = await this.productsRepository.findOne({
      where: { id: sale.product.id },
    });
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    // Calculate the difference in quantity sold
    const quantityDifference =
      (updateSaleDto.quantitySold ?? 0) - sale.quantitySold;

    // Update the product quantity
    product.quantity -= quantityDifference;
    await this.productsRepository.save(product);

    Object.assign(sale, updateSaleDto);
    return this.salesRepository.save(sale);
  }

  async deleteSale(id: string): Promise<boolean> {
    const sale = await this.salesRepository.findOne({
      where: { id },
      relations: ["product"],
    });
    if (!sale) {
      throw new NotFoundException("Sale not found");
    }

    const product = await this.productsRepository.findOne({
      where: { id: sale.product.id },
    });
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    // Restore the product quantity
    const newProductQuantity =
      Number(formatNumber(product.quantity)) +
      Number(formatNumber(sale.quantitySold));
    await this.productsRepository.save({
      ...product,
      quantity: newProductQuantity,
    });

    // Delete the sale
    const result = await this.salesRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
