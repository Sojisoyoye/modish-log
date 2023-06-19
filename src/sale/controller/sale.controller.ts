import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SaleDto } from '../dto';
import { SaleService } from '../service/sale.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  public async getAll() {
    return await this.saleService.getAll();
  }

  @Get(':id')
  public async getSale(@Param('id') id: number) {
    try {
      return await this.saleService.getSale(id);
    } catch (e) {
      throw new HttpException(
        `Sale with ID: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSale(@Body() saleDto: SaleDto) {
    return await this.saleService.createSale(saleDto);
  }
}
