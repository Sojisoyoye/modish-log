import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppDataSource } from "./data-source";

const APP_PORT = 3001;

async function bootstrap() {
  try {
    console.log("Initializing database connection...");
    await AppDataSource.initialize()
      .then(() => {
        console.log("Database connection initialized successfully");
      })
      .catch((error) => {
        console.error("Error during database initialization:", error);
        throw error;
      });

    console.log("Running database migrations...");
    try {
      const migrations = await AppDataSource.runMigrations();
      console.log(
        `Migrations completed successfully. Ran ${migrations.length} migrations`
      );
      migrations.forEach((migration) => {
        console.log(`- ${migration.name}`);
      });
    } catch (error) {
      console.error("Error during migrations:", error);
      console.warn(
        "Application will continue without running migrations."
      );
    }

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

    app.enableCors({
      origin: [
        "https://modish-log.vercel.app",
        "https://modish-log-acceptance.vercel.app",
        "https://modish-log-sandbox.vercel.app",
        "http://localhost:3002",
        "http://localhost:3000",
      ],
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
