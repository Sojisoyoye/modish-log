import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

const APP_PORT = 3001;

async function bootstrap() {
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
  const allowedOrigins = [
    "http://localhost:3000",
    "https://modish-log.vercel.app",
    "https://modish-igkqz8ugk-soji-soyoyes-projects.vercel.app",
  ];

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Accept, Authorization",
  });

  await app.listen(process.env.APP_PORT || APP_PORT);
  console.log(
    `Application is running on port ${process.env.APP_PORT || APP_PORT}`
  );
}
bootstrap();
