import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable raw body parsing for the webhook route
  //app.use('/webhook', express.raw({ type: 'application/json' }));
  await app.listen(3000);
}
bootstrap();
