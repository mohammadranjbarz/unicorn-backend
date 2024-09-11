import { Injectable, Logger } from '@nestjs/common';

import { TokenSymbols } from './types/tokens';
import { getTokenPrices } from '@giveth/monoswap';
import { PrismaService } from 'src/prisma/prisma.service';

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
