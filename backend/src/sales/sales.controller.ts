import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  NotFoundException,
  Delete,
} from "@nestjs/common";
import { SalesService } from "./sales.service";
import { Sale } from "./sales.entity";
import { CreateSaleDto, UpdateSaleDto } from "./dto/dto";

@Controller("api/sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async createSale(
    @Body() createSaleDto: CreateSaleDto
  ): Promise<Sale> {
    return this.salesService.createSale(createSaleDto);
  }

  @Get()
  async findAll(): Promise<Sale[]> {
    return this.salesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Sale | null> {
    const sale = await this.salesService.findOne(id);
    return sale;
  }

  @Put(":id")
  async updateSale(
    @Param("id") id: string,
    @Body() updateSaleDto: UpdateSaleDto
  ) {
    const sale = await this.salesService.updateSale(id, updateSaleDto);
    if (!sale) {
      throw new NotFoundException("Sale not found");
    }
    return sale;
  }

  @Delete(":id")
  async deleteSale(@Param("id") id: string) {
    const result = await this.salesService.deleteSale(id);
    if (!result) {
      throw new NotFoundException("Sale not found");
    }
    return { message: "Sale deleted successfully" };
  }
}
