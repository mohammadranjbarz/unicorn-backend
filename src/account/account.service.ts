// src/account/account.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  // Create a new account
  async createAccount(data: Prisma.AccountCreateInput) {
    try {
      return await this.prisma.account.create({
        data,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Prisma error code for unique constraint violation
        throw new ConflictException(
          'Account with this address or verifier already exists',
        );
      }
      throw error; // Propagate any other errors
    }
  }
  // delete accounts
  async deleteAccounts() {
    try {
      return await this.prisma.account.deleteMany({});
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Prisma error code for unique constraint violation
        throw new ConflictException('Failed to delete accounts');
      }
      throw error; // Propagate any other errors
    }
  }

  // Get account by address or verifier
  async getAccountByAddressOrVerifier(identifier: string) {
    const account = await this.prisma.account.findFirst({
      where: {
        OR: [{ address: identifier }, { verifier_address: identifier }],
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  // Update username or profile_image
  async updateAccount(
    identifier: string,
    handle?: string,
    profile_image?: string,
    subscriptions?: string[],
    first_name?: string,
    last_name?: string,
    country?: string,
    got_airdropped?: boolean,
    stake_transaction_hash?: string,
  ) {
    const account = await this.prisma.account.findFirst({
      where: {
        OR: [{ address: identifier }, { verifier_address: identifier }],
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return this.prisma.account.update({
      where: { id: account.id },
      data: {
        handle,
        profile_image,
        subscriptions,
        first_name,
        last_name,
        country,
        got_airdropped,
        stake_transaction_hash,
      },
    });
  }

  async findByHandle(handle: string) {
    return await this.prisma.account.findFirstOrThrow({
      where: { handle: handle },
    });
  }
}
