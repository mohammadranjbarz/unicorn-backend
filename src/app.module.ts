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
import config from './utils/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    AuthModule,
    // UsersModule,
    SporkDAOMoudle,
    NsModule,
    PricingModule,
    PoapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
