import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Sale } from "../sales/sales.entity";
import { StockCount } from "../stock/stock-count.entity";
import { StockBalanceReport } from "../stock/stock-balance-report.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  color!: string; // e.g., Akala, Wenge

  @Column()
  size!: string; // e.g., 0.5mm by 21mm, 1mm by 21mm

  @Column({ type: "decimal", precision: 4, scale: 1, nullable: false }) // Allows decimal values
  quantity!: number; // Current stock

  @Column("decimal", { precision: 10, scale: 2 }) // Price with 10 digits total and 2 decimal places
  price!: number; // Optional: Price per unit

  @OneToMany(() => Sale, (sale) => sale.product)
  sales!: Sale[];

  @OneToMany(() => StockCount, (stockCount) => stockCount.product)
  stockCounts!: StockCount[];

  @OneToMany(() => StockBalanceReport, (report) => report.product)
  stockBalanceReports!: StockBalanceReport[];
}
