"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = require("fs");
const common_1 = require("@nestjs/common");
const enviroment_variables_enum_1 = require("./shared/enums/enviroment.variables.enum");
const boolean_util_1 = require("./shared/utils/boolean.util");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = require("body-parser");
async function bootstrap() {
    const enviroment = process.env.NODE_ENV.toUpperCase();
    const keyFileExists = fs.existsSync('./../secrets/sol-app.api.key.pem');
    const certFileExists = fs.existsSync('./../secrets/sol-app.api.crt.pem');
    const httpsOptions = keyFileExists && certFileExists
        ? {
            key: fs.readFileSync('./../secrets/sol-app.api.key.pem'),
            cert: fs.readFileSync('./../secrets/sol-app.api.crt.pem'),
        }
        : null;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
    const configService = app.get(config_1.ConfigService);
    const logger = new common_1.Logger('main');
    app.use(bodyParser.json({ limit: '100mb' }));
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    if (boolean_util_1.default.getBoolean(configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.ENABLE_CORS))) {
        const corsOptions = {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: true,
            allowedHeaders: 'Content-Type, Accept, Authorization, ResponseType'
        };
        app.enableCors(corsOptions);
        logger.debug('* CORS ENABLED');
    }
    if (configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.ENABLE_DOCS)) {
        const swaggerOptions = new swagger_1.DocumentBuilder()
            .setTitle(`SOL Sistema Online de Licitação - API | ${enviroment}`)
            .setVersion('0.0.1')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions);
        swagger_1.SwaggerModule.setup('docs', app, document);
        logger.debug('* DOCS ENABLED');
    }
    const port = configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.PORT) || 3000;
    await app.listen(port);
    logger.log(`${enviroment} | Sol API started at port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map