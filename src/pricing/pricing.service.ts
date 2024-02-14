import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { TokenSymbols } from './types/tokens';
import { getTokenPrices } from '@giveth/monoswap';

@Injectable()
export class PricingService {
  private readonly logger = new Logger(PricingService.name);
  constructor(private readonly prismaService: PrismaService) {}

  getPrice = async (token: TokenSymbols) => {
    try {
      const prices = await getTokenPrices(token, ['USDT'], 1);
      return prices[0];
    } catch (e) {
      return 1;
    }
  };
}
