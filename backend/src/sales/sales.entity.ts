import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: "decimal", precision: 4, scale: 1, nullable: false })
  quantitySold!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column()
  saleDate!: Date;

  @Column('boolean', { default: false })
  paid!: boolean;

  @Column('text', { nullable: true })
  comment!: string;

  @ManyToOne(() => Product, (product) => product.sales)
  product!: Product;
}