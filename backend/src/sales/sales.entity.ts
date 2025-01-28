import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantitySold!: number;

  @Column()
  saleDate!: Date;

  @ManyToOne(() => Product, (product) => product.sales)
  product!: Product;
}