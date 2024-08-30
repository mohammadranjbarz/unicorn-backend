import {
  Controller,
  Get,
  Post,
  Param,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { SporkDAOService } from './spork.service';

@Controller({ path: 'spork' })
export class SporkDAOController {
  constructor(private readonly sporkDAOService: SporkDAOService) {}

  @Get('api/member/hasStaked/:address')
  async getUserPOAPs(@Param('address') address: string) {
    try {
      const data = await this.sporkDAOService.getHasStaked(address);
      return {
        data,
        status: 'success',
      };
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        'Failed to get',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('api/member')
  async postEventQRCodes(@Body() body: any) {
    try {
      const data = await this.sporkDAOService.postMemberData(body);
      if (data) {
        return {
          data,
          status: 'success',
        };
      } else {
        throw new HttpException(
          'Failed to post ',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Failed to post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('api/airdrop')
  async airdropSpork(@Body() body: { address: string; amount: string }) {
    try {
      const data = await this.sporkDAOService.airDropSpork(
        body.address,
        body.amount,
      );
      if (data) {
        return {
          data,
          status: 'success',
        };
      } else {
        throw new HttpException('Failed to post ', HttpStatus.BAD_REQUEST);
      }
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Failed to post ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
