import { Controller, Post, Headers, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as crypto from 'crypto';

@Controller('webhook')
export class WebhookController {
  private readonly WEBHOOK_SECRET = 'your_webhook_secret'; // Set your WooCommerce webhook secret

  @Post()
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('x-wc-webhook-signature') receivedSignature: string,
  ) {
    // Ensure signature is present
    if (!receivedSignature) {
      return res.status(400).send('Missing signature');
    }

    console.log(JSON.stringify(req.body, null, 2));

    // Validate the webhook signature
    if (!this.validateWebhookSignature(req.body, receivedSignature)) {
      return res.status(400).send('Invalid signature');
    }

    // Webhook is valid, process the data
    console.log('Valid Webhook:', req.body);
    res.status(200).send('Webhook received');
  }

  private validateWebhookSignature(
    payload: any,
    receivedSignature: string,
  ): boolean {
    // Create HMAC-SHA256 hash using the webhook secret
    const hmac = crypto.createHmac('sha256', this.WEBHOOK_SECRET);
    hmac.update(JSON.stringify(payload), 'utf8');
    const calculatedSignature = hmac.digest('base64');

    // Securely compare signatures
    return crypto.timingSafeEqual(
      Buffer.from(calculatedSignature, 'utf8'),
      Buffer.from(receivedSignature, 'utf8'),
    );
  }
}
