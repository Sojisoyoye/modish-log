import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  quantitySold!: number;

  @Column('decimal', { precision: 10, scale: 2 }) // Store price as a decimal
  price!: number;

  @Column()
  saleDate!: Date;

  @ManyToOne(() => Product, (product) => product.sales)
  product!: Product;
}