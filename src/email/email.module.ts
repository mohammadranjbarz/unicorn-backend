import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // Ensures environment variables are accessible
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService], // Export if needed in other modules
})
export class EmailModule {}
