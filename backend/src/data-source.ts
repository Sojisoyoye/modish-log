import { DataSource } from 'typeorm';
import { Product } from './products/products.entity';
import { Sale } from './sales/sales.entity';
import { User } from './users/users.entity';

import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Product, Sale],
  synchronize: false, // Disable synchronize in production
  migrations: ['src/migrations/*.ts'], // Path to your migration files
});