// src/health/health.controller.ts

import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async checkHealth() {
    try {
      // A basic query to check the database connection
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'ok2',
        database: 'connected',
      };
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        status: 'error',
        database: 'disconnected',
      };
    }
  }
}
