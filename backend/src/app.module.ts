import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Sale } from './sales/sales.entity';
import { Product } from './products/products.entity';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { StockBalanceReport } from './stock/stock-balance-report.entity';
import { StockCount } from './stock/stock-count.entity';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration available globally
      envFilePath: '.env', // Specify the path to your .env file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Product, Sale, StockCount, StockBalanceReport],
        synchronize: true, // Disable in production
      }),
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    SalesModule,
    StockModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}