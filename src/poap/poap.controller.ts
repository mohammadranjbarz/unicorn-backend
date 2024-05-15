import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PoapService } from './poap.service';

@Controller('poap')
export class PoapController {
  constructor(private readonly poapService: PoapService) {}

  @Get('user/:address')
  async getUserPOAPs(@Param('address') address: string) {
    try {
      const poaps = await this.poapService.getUserPOAPs(address);
      return poaps;
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        'Failed to get user POAPs',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('event/qr-codes')
  async postEventQRCodes(@Headers('Authorization') token: string) {
    try {
      const result = await this.poapService.postEventQRCodes(token);
      if (result) {
        return { status: 'success', message: 'QR codes posted successfully' };
      } else {
        throw new HttpException(
          'Failed to post QR codes',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Failed to post QR codes',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('actions/claim-qr')
  async getActionsClaimQr(
    @Query('qr_hash') qr_hash: string,
    @Headers('Authorization') token: string,
  ) {
    try {
      const result = await this.poapService.getActionsClaimQr(qr_hash, token);
      if (result) {
        return {
          status: 'success',
          message: 'Claim QR retrieved successfully',
        };
      } else {
        throw new HttpException(
          'Failed to retrieve claim QR',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve claim QR',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('actions/claim-qr')
  async postActionsClaimQr(
    @Body() body: any,
    @Headers('Authorization') token: string,
  ) {
    try {
      const result = await this.poapService.postActionsClaimQr(body, token);
      if (result) {
        return { status: 'success', message: 'Claim QR posted successfully' };
      } else {
        throw new HttpException(
          'Failed to post claim QR',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Failed to post claim QR',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('actions/scan/:address')
  async getActionsScan(@Param('address') address: string) {
    try {
      const result = await this.poapService.getActionsScan(address);
      if (result) {
        return {
          status: 'success',
          message: 'Scan action retrieved successfully',
        };
      } else {
        throw new HttpException(
          'Failed to retrieve scan action',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve scan action',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('oauth/token')
  async postOauthToken() {
    try {
      const result = await this.poapService.postOauthToken();
      if (result) {
        return {
          status: 'success',
          message: 'OAuth token retrieved successfully',
        };
      } else {
        throw new HttpException(
          'Failed to retrieve OAuth token',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve OAuth token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
