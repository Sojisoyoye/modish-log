import { DataSource } from "typeorm";
import { Product } from "./products/products.entity";
import { Sale } from "./sales/sales.entity";
import { User } from "./users/users.entity";
import { StockCount } from "./stock/stock-count.entity";
import { StockBalanceReport } from "./stock/stock-balance-report.entity";

import * as dotenv from "dotenv";
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: "postgres",
  ...(databaseUrl
    ? {
        url: databaseUrl,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || "5432", 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      }),
  entities: [User, Product, Sale, StockCount, StockBalanceReport],
  synchronize: false,
  migrations: ["src/migrations/*.ts"],
  migrationsTableName: "migrations",
  migrationsRun: true,
});
