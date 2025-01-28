import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from '../sales/sales.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  color!: string; // e.g., Akala, Wenge

  @Column()
  size!: string; // e.g., 0.5mm by 21mm, 1mm by 21mm

  @Column()
  quantity!: number; // Current stock

  @Column({ nullable: true })
  price!: number; // Optional: Price per unit

  @OneToMany(() => Sale, (sale) => sale.product)
  sales!: Sale[];
}