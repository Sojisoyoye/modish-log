import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { User } from "./users/users.entity";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Sale } from "./sales/sales.entity";
import { Product } from "./products/products.entity";
import { ProductsModule } from "./products/products.module";
import { SalesModule } from "./sales/sales.module";
import { StockBalanceReport } from "./stock/stock-balance-report.entity";
import { StockCount } from "./stock/stock-count.entity";
import { StockModule } from "./stock/stock.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const databaseUrl = configService.get<string>("DATABASE_URL");
        let config: TypeOrmModuleOptions;

        if (databaseUrl) {
          const parsed = parseDbUrl(databaseUrl);
          config = {
            type: "postgres",
            host: parsed.host,
            port: parsed.port,
            username: parsed.username,
            password: parsed.password,
            database: parsed.database,
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: configService.get("NODE_ENV") !== "production",
            retryAttempts: 3,
            retryDelay: 3000,
          };
        } else {
          config = {
            type: "postgres",
            host: configService.getOrThrow<string>("DB_HOST"),
            port: configService.getOrThrow<number>("DB_PORT"),
            username: configService.getOrThrow<string>("DB_USERNAME"),
            password: configService.getOrThrow<string>("DB_PASSWORD"),
            database: configService.getOrThrow<string>("DB_DATABASE"),
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: configService.get("NODE_ENV") !== "production",
          };
        }

        return config;
      },
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    SalesModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

const parseDbUrl = (url: string) => {
  const pattern = /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
  const match = url.match(pattern);
  if (!match) throw new Error("Invalid DATABASE_URL");

  return {
    host: match[3],
    port: parseInt(match[4]),
    username: match[1],
    password: match[2],
    database: match[5],
  };
};
