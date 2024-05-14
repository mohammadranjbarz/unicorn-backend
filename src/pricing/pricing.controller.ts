import { Body, Controller, Get, Logger } from '@nestjs/common';

import { PricingService } from './pricing.service';
import { GetPrice, GetPricesBulk } from './dto/pricing.dto';
import {
  frontendSupportedSanityTokenPrices,
  frontendSupportedTokens,
} from './types/tokens';

@Controller({ path: 'pricing' })
export class PricingController {
  private readonly logger = new Logger(PricingController.name);
  constructor(private readonly pricingService: PricingService) {}

  @Get()
  async getPrice(@Body() { token }: GetPrice) {
    return this.pricingService.getPrice(token);
  }

  @Get('/bulk')
  async getPricesBulk(@Body() { tokens }: GetPricesBulk) {
    const prices = await Promise.all(
      tokens.map((item) => this.pricingService.getPrice(item)),
    );
    return prices;
  }

  // All supported tokens on the client-side
  @Get('/all')
  async getAllSupportedTokens() {
    const prices = await Promise.all(
      frontendSupportedTokens.map((item) => this.pricingService.getPrice(item)),
    );
    const result = prices.reduce(
      (acc, curr, index) =>
        curr !== 1
          ? {
              ...acc,
              [frontendSupportedTokens[index]]: curr,
            }
          : acc,
      {},
    );

    return { ...frontendSupportedSanityTokenPrices, ...result };
  }
}
