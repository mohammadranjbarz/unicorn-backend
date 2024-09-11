import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
// import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
