import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
import { EventService } from 'src/events/event.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private prismaService: PrismaService,
    private readonly emailService: EmailService,
    private readonly eventService: EventService,
  ) {}

  // create = async ({
  //   address,
  //   isBadgeHolder,
  // }: {
  //   address: string;
  //   isBadgeHolder: boolean;
  // }): Promise<User | null> => {
  //   return this.prismaService.user.create({
  //     data: { address, isBadgeHolder: isBadgeHolder ? 1 : 0 },
  //   });
  // };

  // Simulating user steps; ideally, this should be fetched from the database
  async hasUserCreatedWallet(userId: string): Promise<boolean> {
    // Logic to check if the user has created a wallet (e.g., from DB or API call)
    return true;
  }

  async isUserDaoMember(userId: string): Promise<boolean> {
    // Logic to check if the user is a DAO member
    return true;
  }

  async hasUserSecuredSubdomain(userId: string): Promise<boolean> {
    // Logic to check if the user has secured a subdomain
    return true;
  }

  async sendWelcomeEmailIfEligible({
    userId,
    userEmail,
    username,
    subdomain,
    walletAddress,
  }: {
    userId: string;
    userEmail: string;
    username: string;
    subdomain: string;
    walletAddress: string;
  }): Promise<any> {
    const hasWallet = await this.hasUserCreatedWallet(userId);
    const isDaoMember = await this.isUserDaoMember(userId);
    const hasSubdomain = await this.hasUserSecuredSubdomain(userId);

    if (hasWallet && isDaoMember && hasSubdomain) {
      return this.emailService.sendWelcomeEmail(
        userEmail,
        username,
        subdomain,
        walletAddress,
      );
    } else {
      throw new Error('User has not completed all required steps');
    }
  }

  // Simulating checking if the user exists; this could be a DB check
  async findUserByEmail(email: string): Promise<boolean> {
    // Logic to check if the user exists in your system
    // For now, let's assume the user always exists for simplicity
    return true;
  }

  // Handle forgotten sign-in method
  async handleForgotSignInMethod(email: string): Promise<any> {
    const userExists = await this.findUserByEmail(email);

    if (userExists) {
      const templateData = {
        email,
        signInHelp:
          'Please remember you can use Google, Wallet, or Magic Link to sign in.',
        supportEmail: 'support@unicorn.eth', // Replace with the real support email
      };

      return this.emailService.sendForgotSignInEmail(email, templateData);
    } else {
      throw new Error('User not found');
    }
  }

  async createUser(userData: any) {
    // Simulate user creation logic
    const userEmail = userData.email;
    const username = userData.username;

    // Trigger the user-created event to send a welcome email
    await this.eventService.handleUserCreated(userEmail, username);

    return { success: true };
  }
}
