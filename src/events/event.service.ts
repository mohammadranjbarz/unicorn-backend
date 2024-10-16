import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service'; // Import the EmailService

@Injectable()
export class EventService {
  constructor(private readonly emailService: EmailService) {}

  // Example: User registration event triggers welcome email
  async handleUserCreated({
    userEmail,
    username,
    subdomain,
    walletAddress,
  }: {
    userEmail: string;
    username: string;
    subdomain: string;
    walletAddress: string;
  }): Promise<void> {
    // Change function call with correct param names

    await this.emailService.sendWelcomeEmail(
      {
        recipientEmail: userEmail, // recipientEmail
        username, // username
        subdomain, // subdomain
        walletAddress, // walletAddress
      }
    );
  }

  // Example: Handling blockchain event
  async handleBlockchainEvent(eventData: any) {
    if (eventData.eventName === 'Minted') {
      const templateData = {
        email: eventData.userEmail,
        mintDetails: 'You’ve successfully minted your token!',
        supportEmail: 'support@unicorn.eth',
      };

      await this.emailService.sendMintNotification({
        recipientEmail: eventData.userEmail,
        mintDetails: templateData.mintDetails,
      });
    }
  }
}
