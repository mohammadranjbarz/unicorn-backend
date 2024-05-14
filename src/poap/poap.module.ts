import { Module } from '@nestjs/common';
import { PoapService } from './poap.service';
import { PoapController } from './poap.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.POAP_BASE_URL,
      headers: {
        'Content-type': 'application/json',
        'X-API-Key': process.env.POAP_API_KEY,
      },
    }),
  ],
  controllers: [PoapController],
  providers: [PoapService],
})
export class PoapModule {}
