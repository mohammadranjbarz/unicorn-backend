import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { UsersService } from 'src/user/users.service';
import { UsersModule } from 'src/user/users.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [UsersModule],
  providers: [PricingService, PrismaService, ConfigService, UsersService],
  controllers: [PricingController],
  exports: [PricingService],
})
export class PricingModule {}
