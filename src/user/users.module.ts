import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
// import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [],
  providers: [UsersService, PrismaService, EmailService],
  exports: [UsersService],
})
export class UsersModule {}
