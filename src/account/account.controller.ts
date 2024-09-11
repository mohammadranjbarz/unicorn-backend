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
    @Body('verifier') verifier: string,
    @Body('email') email: string,
    @Body('profile_image') profile_image?: string,
    @Body('username') username?: string,
    @Body('subscriptions') subscriptions?: string[],
  ) {
    return this.accountService.createAccount({
      address,
      verifier,
      email,
      profile_image,
      username,
      subscriptions,
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
  ) {
    return this.accountService.updateAccount(
      identifier,
      username,
      profile_image,
      subscriptions,
    );
  }
}
