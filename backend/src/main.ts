import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const options = {
        origin: "http://localhost:5500",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true
    };
 
    app.enableCors(options);

    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3000);
}
bootstrap();
