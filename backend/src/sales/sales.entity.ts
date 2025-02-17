import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: "decimal", precision: 4, scale: 1, nullable: false }) // Allows decimal values
  quantitySold!: number;

  @Column('decimal', { precision: 10, scale: 2 }) // Store price as a decimal
  price!: number;

  @Column()
  saleDate!: Date;

  @Column('boolean', { default: false }) // Default to unpaid
  paid!: boolean;

  @Column('text', { nullable: true }) // Allow null comments
  comment!: string;

  @ManyToOne(() => Product, (product) => product.sales)
  product!: Product;
}