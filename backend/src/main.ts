import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppDataSource } from "./data-source";
import * as bcrypt from "bcrypt";

const APP_PORT = 3001;

async function seedAdmin() {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      console.warn("ADMIN_PASSWORD not set. Skipping admin seeding.");
      return;
    }

    const adminUser = await AppDataSource.query(
      `SELECT * FROM "user" WHERE username = 'admin'`
    );

    if (adminUser.length === 0) {
      console.log("Admin user not found. Creating new admin user...");
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await AppDataSource.query(
        `INSERT INTO "user" (username, password, role) VALUES ('admin', $1, 'Admin')`,
        [hashedPassword]
      );
      console.log("Admin user created successfully");
    } else {
      console.log("Found existing admin user. Updating password...");
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await AppDataSource.query(
        `UPDATE "user" SET password = $1 WHERE username = 'admin'`,
        [hashedPassword]
      );
      console.log("Admin user password updated successfully");
    }
  } catch (error) {
    console.error("Error during admin seeding:", error);
  }
}

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log("Database connection initialized");

    console.log("Running database migrations...");
    await AppDataSource.runMigrations();
    console.log("Migrations completed successfully");

    await seedAdmin();

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true })
    );

    const config = new DocumentBuilder()
      .setTitle("Modish log API")
      .setDescription("Sales and Inventory API")
      .setVersion("1.0")
      .addTag("Auth")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    // CORS configuration
    app.enableCors({
      origin: "https://modish-log.vercel.app",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
      allowedHeaders: [
        "Content-Type",
        "Accept",
        "Authorization",
        "X-Requested-With",
        "Origin",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
      ],
      exposedHeaders: ["Content-Range", "X-Content-Range"],
      maxAge: 3600,
    });

    await app.listen(process.env.APP_PORT || APP_PORT);
    console.log(
      `Application is running on port ${process.env.APP_PORT || APP_PORT}`
    );
  } catch (error) {
    console.error("Error during application startup:", error);
    process.exit(1);
  }
}

bootstrap();
