import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { NsModule } from './ns/ns.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, NsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
