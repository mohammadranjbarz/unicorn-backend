import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EmailModule } from '../email/email.module'; // Import Email module

@Module({
  imports: [EmailModule], // Import the EmailModule to trigger email sends
  providers: [EventService],
})
export class EventModule {}
