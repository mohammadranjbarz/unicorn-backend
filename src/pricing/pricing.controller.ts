import { Body, Controller, Get, Logger } from '@nestjs/common';

import { PricingService } from './pricing.service';
import { GetPrice, GetPricesBulk } from './dto/pricing.dto';

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
}
