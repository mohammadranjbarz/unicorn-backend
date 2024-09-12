import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NsModule } from './ns/ns.module';
import { PoapModule } from './poap/poap.module';
import { PricingModule } from './pricing/pricing.module';
import { SporkDAOMoudle } from './spork/spork.module';
import { PrismaModule } from './prisma/prisma.module';
import config from './utils/config';
import { AccountModule } from './account/account.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    AuthModule,
    SporkDAOMoudle,
    NsModule,
    PricingModule,
    PoapModule,
    AccountModule,
    PrismaModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
