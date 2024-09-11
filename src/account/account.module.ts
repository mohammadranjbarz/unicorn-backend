import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  providers: [AccountService, PrismaService, ConfigService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
