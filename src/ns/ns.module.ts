import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NsService } from './ns.service';
import { NsController } from './ns.controller';
import { UsersService } from 'src/user/users.service';
import { UsersModule } from 'src/user/users.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    UsersModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          baseURL: configService.get('OFFCHAIN_BASE_URL'),
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${configService.get('OFFCHAIN_API_KEY')}`,
          },
        };
      },
    }),
    // HttpModule.register({
    //   baseURL:
    //     process.env.OFFCHAIN_BASE_URL || 'https://offchain.namespace.tech',
    //   headers: {
    //     'Content-type': 'application/json',
    //     Authorization: `Bearer ${process.env.OFFCHAIN_API_KEY}`,
    //   },
    // }),
  ],
  providers: [NsService, PrismaService, ConfigService, UsersService],
  controllers: [NsController],
  exports: [NsService],
})
export class NsModule {}
