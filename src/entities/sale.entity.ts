import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ColumnNumericTransformer } from "./util";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  productName!: string;

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
  amount!: number;

  @Column()
  status!: string;

  @Column({
    type: "text",
  })
  comment!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
