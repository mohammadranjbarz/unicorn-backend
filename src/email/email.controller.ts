import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

type SendEmailDto = {
  recipientEmail: string;
  templateData: {
    username: string;
    subdomain: string;
    walletAddress: string;
    email: string;
    supportEmail: string;
  };
};

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() body: SendEmailDto) {
    const { recipientEmail, templateData } = body;
    return this.emailService.sendTemplatedEmail(recipientEmail, templateData);
  }
}
