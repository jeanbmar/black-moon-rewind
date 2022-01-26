import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module.js';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        host: '127.0.0.1',
        port: 8001,
    });
    await app.listen();
}

(async () => {
   await bootstrap();
})();

