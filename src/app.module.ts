import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './user/users.module';
import { NsModule } from './ns/ns.module';
import { PoapModule } from './poap/poap.module';
import { PricingModule } from './pricing/pricing.module';
import { SporkDAOMoudle } from './spork/spork.module';
import { AccountService } from './account/account.service';
import { PrismaModule } from './prisma/prisma.module';
import config from './utils/config';
import { PrismaService } from './prisma/prisma.service';
import { AccountController } from './account/account.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    AuthModule,
    // UsersModule,
    SporkDAOMoudle,
    NsModule,
    PricingModule,
    PoapModule,
    PrismaModule,
  ],
  controllers: [AppController, AccountController],
  providers: [AppService, PrismaService, AccountService],
})
export class AppModule {}
