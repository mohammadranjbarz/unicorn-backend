import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NsService } from './ns.service';
import { NsController } from './ns.controller';
import { UsersService } from 'src/user/users.service';
import { UsersModule } from 'src/user/users.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [UsersModule],
  providers: [NsService, PrismaService, ConfigService, UsersService],
  controllers: [NsController],
  exports: [NsService],
})
export class NsModule {}
