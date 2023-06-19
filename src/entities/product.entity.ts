import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ColumnNumericTransformer } from "./util";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  name!: string;

  @Column()
  faced!: string;

  @Column()
  size!: string;

  @Column("numeric", {
    precision: 4,
    scale: 1,
    transformer: new ColumnNumericTransformer(),
  })
  quantity!: number;

  @Column()
  unitPrize!: number;

  @Column()
  totalAmount!: number;

  @Column({
    nullable: true,
  })
  amountSold!: number;

  @Column("numeric", {
    precision: 4,
    scale: 1,
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  quantitySold!: number;

  @Column("numeric", {
    precision: 4,
    scale: 1,
    transformer: new ColumnNumericTransformer(),
  })
  quantityLeft!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
