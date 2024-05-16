import { Module } from '@nestjs/common';
import { PoapService } from './poap.service';
import { PoapController } from './poap.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          baseURL: configService.get('POAP_BASE_URL'),
          headers: {
            'Content-type': 'application/json',
            'X-API-Key': configService.get('POAP_API_KEY'),
          },
        };
      },
    }),
  ],
  controllers: [PoapController],
  providers: [PoapService],
})
export class PoapModule {}
