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

const allowedSubnames = [
  'moe.unicorn-wallet.com',
  'kay.unicorn-wallet.com',
  'yussdev.unicorn-wallet.com',
];
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
    @Body('handle') handle?: string,
    @Body('subscriptions') subscriptions?: string[],
    @Body('first_name') first_name?: string,
    @Body('last_name') last_name?: string,
    @Body('country') country?: string,
    @Body('got_airdropped') got_airdropped?: boolean,
  ) {
    return this.accountService.createAccount({
      address,
      verifier_address,
      email,
      profile_image,
      handle,
      subscriptions: subscriptions || [],
      first_name,
      last_name,
      country,
      got_airdropped,
    });
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
    @Body('stake_transaction_hash') stake_transaction_hash?: string,
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
      stake_transaction_hash,
    );
  }
}
