import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { WebhookController } from './app.controller';

@Module({
  imports: [],
  controllers: [WebhookController],
  providers: [AppService],
})
export class AppModule {}
