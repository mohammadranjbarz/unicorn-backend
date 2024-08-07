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
      throw new HttpException('Failed to get', HttpStatus.BAD_REQUEST);
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
        throw new HttpException('Failed to post ', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Failed to post', HttpStatus.BAD_REQUEST);
    }
  }
}
