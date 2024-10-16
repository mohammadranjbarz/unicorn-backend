import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';
import { ForgotSignInTemplateData } from 'src/user/types/forgot-signin-template-data.interface';
import { MintNotificationTemplateData } from 'src/user/types/mint-notification-template-data.interface';

type EmailTemplateData = {
  username: string;
  subdomain: string;
  walletAddress: string;
  email: string;
  supportEmail: string;
};

@Injectable()
export class EmailService {
  private readonly ses: AWS.SES;

  constructor() {
    this.ses = new AWS.SES({
      region: process.env.AWS_REGION || 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async sendTemplatedEmail(
    recipientEmail: string,
    templateData:
      | EmailTemplateData
      | ForgotSignInTemplateData
      | MintNotificationTemplateData,
    templateName = 'WelcomeTemplate', // Use "WelcomeTemplate" for this specific email
  ): Promise<any> {
    const params: AWS.SES.SendTemplatedEmailRequest = {
      Source: 'your-verified-email@example.com', // Replace with a verified email
      Template: templateName,
      Destination: {
        ToAddresses: [recipientEmail],
      },
      TemplateData: JSON.stringify(templateData),
    };

    try {
      const result = await this.ses.sendTemplatedEmail(params).promise();
      return { message: 'Email sent successfully!', result };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendWelcomeEmail(
    {
      recipientEmail,
      username,
      subdomain,
      walletAddress,
    }:{
    recipientEmail: string,
    username: string,
    subdomain: string,
    walletAddress: string,
}
  ): Promise<any> {
    const templateData: EmailTemplateData = {
      username,
      subdomain,
      walletAddress,
      email: recipientEmail,
      supportEmail: 'support@yourdomain.com', // Modify as needed
    };

    return this.sendTemplatedEmail(recipientEmail, templateData);
  }

  async sendForgotSignInEmail(
    recipientEmail: string,
    templateData: ForgotSignInTemplateData,
  ): Promise<any> {
    return this.sendTemplatedEmail(
      recipientEmail,
      templateData,
      'ForgotSignInTemplate',
    );
  }

  async sendMintNotification(
    {
      recipientEmail,
      mintDetails,
    }: {
      recipientEmail: string;
      mintDetails: string;
    }, // Include details like token name, ID, etc.
  ): Promise<any> {
    const templateData: MintNotificationTemplateData = {
      email: recipientEmail,
      mintDetails,
      supportEmail: 'support@yourdomain.com', // Modify as needed
    };

    return this.sendTemplatedEmail(
      recipientEmail,
      templateData,
      'MintNotificationTemplate',
    );
  }
}
