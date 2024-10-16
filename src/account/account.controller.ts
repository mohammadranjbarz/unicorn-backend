// src/account/account.controller.ts
import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { ThirdwebAuth } from '@thirdweb-dev/auth'; // Import Thirdweb auth library

const allowedSubnames = [
  'moe.unicorn-wallet.com',
  'kay.unicorn-wallet.com',
  'yussdev.unicorn-wallet.com',
];

@Controller('account')
export class AccountController {
  private readonly auth: ThirdwebAuth;

  constructor(private readonly accountService: AccountService) {
    // Initialize Thirdweb auth with your domain
    this.auth = new ThirdwebAuth({
      domain: "your-domain.com", // Replace with your domain
    });
  }

  // Create a new account
  @Post()
  async createAccount(
    @Body('address') address: string,
    @Body('verifier_address') verifier_address: string,
    @Body('email') email: string,
    @Body('token') token: string,  // Add token received from frontend
    @Body('profile_image') profile_image?: string,
    @Body('handle') handle?: string,
    @Body('subscriptions') subscriptions?: string[],
  ) {
    try {
      // Verify the token with Thirdweb to extract email and walletAddress
      const payload = await this.auth.verify(token);

      if (!payload) {
        throw new InternalServerErrorException(
          'Verification failed. Invalid token.'
        );
      }

      // Extract email and walletAddress from the verified token payload
      const verifiedEmail = payload.email;
      const verifiedWalletAddress = payload.walletAddress;

      // Compare the extracted email and walletAddress with what was submitted
      if (email !== verifiedEmail || address !== verifiedWalletAddress) {
        throw new InternalServerErrorException(
          'Verification failed. Email or walletAddress do not match the token.'
        );
      }

      // Proceed to create the account after validation
      return this.accountService.createAccount({
        address,
        verifier_address,
        email,
        profile_image,
        handle,
        subscriptions: subscriptions || [],
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create account: ${error.message}`);
    }
  }

  @Get('/check')
  async getAccountByHandle(@Query('domain') handle: string) {
    const subname = handle?.split('.')[0];

    if (subname === 'app')
      return {
        status: 'ok',
      };
    if (!handle) {
      throw new InternalServerErrorException(`Domain can't be empty`);
    }
    console.log({ allowedSubnames, subname });
    if (allowedSubnames.includes(handle)) {
      return {
        status: 'ok',
      };
    } else {
      throw new InternalServerErrorException(
        `Account with handle '${handle}' not found`,
      );
    }
    const account = await this.accountService.findByHandle(handle);

    // If no account is found, throw a 404 error
    if (!account) {
      throw new InternalServerErrorException(
        `Account with handle '${handle}' not found`,
      );
    }

    return {
      data: account,
      status: 'ok',
    };
  }

  @Post('/delete-all-accounts')
  async deleteAccounts() {
    return this.accountService.deleteAccounts();
  }

  // Get account by address or verifier
  @Get(':identifier')
  async getAccount(@Param('identifier') identifier: string) {
    return this.accountService.getAccountByAddressOrVerifier(identifier);
  }

  // Update username or profile_image by address or verifier
  @Patch(':identifier')
  async updateAccount(
    @Param('identifier') identifier: string,
    @Body('handle') handle?: string,
    @Body('profile_image') profile_image?: string,
    @Body('subscriptions') subscriptions?: string[],
    @Body('first_name') first_name?: string,
    @Body('last_name') last_name?: string,
    @Body('country') country?: string,
    @Body('got_airdropped') got_airdropped?: boolean,
  ) {
    return this.accountService.updateAccount(
      identifier,
      handle,
      profile_image,
      subscriptions,
      first_name,
      last_name,
      country,
      got_airdropped,
    );
  }
}
