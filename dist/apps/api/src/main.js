"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT ? Number(process.env.PORT) : 3001;
    await app.listen(port, '0.0.0.0'); // Listen on all interfaces for mobile access
    common_1.Logger.log(`🚀 Application is running on: http://0.0.0.0:${port}/${globalPrefix}`);
}
bootstrap();
//# sourceMappingURL=main.js.map