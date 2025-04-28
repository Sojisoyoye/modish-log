import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppDataSource } from "./data-source";

const APP_PORT = 3001;

async function runMigrations() {
  try {
    console.log("Running database migrations...");
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Error running migrations:", error);
    throw error;
  }
}

async function bootstrap() {
  // Run migrations before starting the application
  await runMigrations();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

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
}
bootstrap();
