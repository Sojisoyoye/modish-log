import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class StockCount {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  countedQuantity!: number;

  @Column()
  countDate!: Date;

  @ManyToOne(() => Product, (product) => product.stockCounts)
  product!: Product;
}