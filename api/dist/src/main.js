"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
require("reflect-metadata");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    var _a, _b;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.NEXT_PUBLIC_APP_URL || '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization,X-Requested-With,Accept-Language',
        optionsSuccessStatus: 204,
        credentials: true,
    });
    app.setGlobalPrefix('api/v1');
    app.use((0, cookie_parser_1.default)());
    const logger = new common_1.Logger('ProArq SaaS');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
    logger.log(`App running on port ${(_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map