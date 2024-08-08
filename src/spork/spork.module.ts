import { Module } from '@nestjs/common';
import { SporkDAOService } from './spork.service';
import { SporkDAOController } from './spork.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          baseURL:
            configService.get('SPORK_DAO_BASE_URL') ||
            'https://stake.sporkdao.io',
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
  ],
  controllers: [SporkDAOController],
  providers: [SporkDAOService],
})
export class SporkDAOMoudle {}
