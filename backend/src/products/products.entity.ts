import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from '../sales/sales.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  color!: string; // e.g., Akala, Wenge

  @Column()
  size!: string; // e.g., 0.5mm by 21mm, 1mm by 21mm

  @Column()
  quantity!: number; // Current stock

  @Column('decimal', { precision: 10, scale: 2 }) // Price with 10 digits total and 2 decimal places
  price!: number; // Optional: Price per unit

  @OneToMany(() => Sale, (sale) => sale.product)
  sales!: Sale[];
}