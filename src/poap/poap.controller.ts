import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  Headers,
} from '@nestjs/common';
import { PoapService } from './poap.service';

@Controller('poap')
export class PoapController {
  constructor(private readonly poapService: PoapService) {}

  @Get('user/:address')
  getUserPOAPs(@Param('address') address: string) {
    try {
      return this.poapService.getUserPOAPs(address);
    } catch (error) {
      console.log({ error });
    }
  }

  @Post('event/qr-codes')
  postEventQRCodes(@Headers('Authorization') token: string) {
    return this.poapService.postEventQRCodes(token);
  }

  @Get('actions/claim-qr')
  getActionsClaimQr(
    @Query('qr_hash') qr_hash: string,
    @Headers('Authorization') token: string,
  ) {
    return this.poapService.getActionsClaimQr(qr_hash, token);
  }

  @Post('actions/claim-qr')
  postActionsClaimQr(
    @Body() body: any,
    @Headers('Authorization') token: string,
  ) {
    return this.poapService.postActionsClaimQr(body, token);
  }

  @Get('actions/scan/:address')
  getActionsScan(@Param('address') address: string) {
    return this.poapService.getActionsScan(address);
  }

  @Post('oauth/token')
  postOauthToken() {
    return this.poapService.postOauthToken();
  }
}
