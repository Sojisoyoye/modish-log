"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const APP_PORT = 3001; // Define the APP_PORT constant
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Enable global validation pipe
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    // Enable CORS for frontend communication
    app.enableCors({
        origin: 'http://localhost:3000', // Replace with your frontend URL
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    await app.listen(process.env.APP_PORT || APP_PORT);
    console.log('Application is running on http://localhost:3001');
}
bootstrap();
