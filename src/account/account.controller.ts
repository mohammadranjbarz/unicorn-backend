// src/account/account.controller.ts
import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // Create a new account
  @Post()
  async createAccount(
    @Body('address') address: string,
    @Body('verifier_address') verifier_address: string,
    @Body('email') email: string,
    @Body('profile_image') profile_image?: string,
    @Body('username') username?: string,
    @Body('subscriptions') subscriptions?: string[],
  ) {
    return this.accountService.createAccount({
      address,
      verifier_address,
      email,
      profile_image,
      username,
      subscriptions: subscriptions || [],
    });
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
    @Body('username') username?: string,
    @Body('profile_image') profile_image?: string,
    @Body('subscriptions') subscriptions?: string[],
    @Body('first_name') first_name?: string,
    @Body('last_name') last_name?: string,
    @Body('country') country?: string,
    @Body('got_airdropped') got_airdropped?: boolean,
  ) {
    return this.accountService.updateAccount(
      identifier,
      username,
      profile_image,
      subscriptions,
      first_name,
      last_name,
      country,
      got_airdropped,
    );
  }
}
