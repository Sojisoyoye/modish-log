import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class StockBalanceReport {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  expectedQuantity!: number;

  @Column()
  actualQuantity!: number;

  @Column()
  difference!: number;

  @Column()
  reportDate!: Date;

  @ManyToOne(() => Product, (product) => product.stockBalanceReports)
  product!: Product;
}