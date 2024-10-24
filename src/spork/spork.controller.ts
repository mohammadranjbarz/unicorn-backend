import {
  Controller,
  Get,
  Post,
  Param,
  HttpException,
  HttpStatus,
  Body, UseGuards
} from "@nestjs/common";
import { SporkDAOService } from './spork.service';
import { JwtAuthGuard } from "src/guards/jwt.guards";

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

  @UseGuards(JwtAuthGuard) // Apply the guard only to this endpoint
  @Post('api/airdrop')
  async airdropSpork(@Body() body: { address: string; amount: string }) {
    try {
      const address = req.user.address; // Extract the address from the token
      const data = await this.sporkDAOService.airDropSpork(
        address,
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
