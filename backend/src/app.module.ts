import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products/products.module";
import { SalesModule } from "./sales/sales.module";
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
        const databaseUrl = process.env.DATABASE_URL;

        // if (databaseUrl) {
        //   return {
        //     type: "postgres",
        //     url: databaseUrl,
        //     entities: [__dirname + "/**/*.entity{.ts,.js}"],
        //     synchronize: configService.get("NODE_ENV") !== "production",
        //     retryAttempts: 3,
        //     retryDelay: 3000,
        //   };
        // }

        if (databaseUrl) {
          const parsed = new URL(databaseUrl);
          return {
            type: "postgres",
            host: parsed.hostname,
            port: parseInt(parsed.port),
            username: parsed.username,
            password: parsed.password,
            database: parsed.pathname.slice(1),
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: configService.get("NODE_ENV") !== "production",
            retryAttempts: 3,
            retryDelay: 3000,
            ssl: true,
            extra: {
              ssl: {
                rejectUnauthorized: false,
              },
            },
          };
        }

        return {
          type: "postgres",
          host: configService.getOrThrow<string>("DB_HOST"),
          port: configService.getOrThrow<number>("DB_PORT"),
          username: configService.getOrThrow<string>("DB_USERNAME"),
          password: configService.getOrThrow<string>("DB_PASSWORD"),
          database: configService.getOrThrow<string>("DB_DATABASE"),
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: configService.get("NODE_ENV") !== "production",
        };
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
