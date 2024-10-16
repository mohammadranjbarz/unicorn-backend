import { Body, Controller, Logger, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { SendWelcomeEmailDto } from 'src/user/dto/send-welcome-email.dto';

@Controller({ path: 'user' })
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post('send-welcome-email')
  async sendWelcomeEmail(@Body() body: SendWelcomeEmailDto) {
    const { userId, userEmail, username, subdomain, walletAddress } = body;
    return this.userService.sendWelcomeEmailIfEligible(
      userId,
      userEmail,
      username,
      subdomain,
      walletAddress,
    );
  }

  @Post('forgot-signin')
  async sendForgotSignInEmail(@Body() body: ForgotSignInDto) {
    const { email } = body;
    return this.userService.handleForgotSignInMethod(email);
  }
}
