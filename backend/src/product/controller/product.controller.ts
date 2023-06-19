import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDto } from '../dto';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getAll() {
    return await this.productService.getAll();
  }

  @Get(':id')
  public async getProduct(@Param('id') id: number) {
    try {
      return await this.productService.getProduct(id);
    } catch (e) {
      throw new HttpException(
        `Product with ID: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async createProduct(@Body() productDto: ProductDto) {
    return await this.productService.createProduct(productDto);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() productDto: ProductDto) {
    return await this.productService.updateProduct(productDto, id);
  }
}
