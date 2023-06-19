import { DataSource } from 'typeorm';
import { Product, Sale, User } from '../entities';

require('dotenv').config();

export const config = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Product, Sale],
  synchronize: true,
});
