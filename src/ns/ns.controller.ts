import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
} from '@nestjs/common';

import { NsService } from './ns.service';
import { Chains } from './types/chains';
import { CreateSubname, GetSubname } from './dto/ns.dto';

@Controller({ path: 'ns' })
export class NsController {
  private readonly logger = new Logger(NsController.name);
  constructor(private readonly nsService: NsService) {}

  // @ApiResponse({
  //   status: 401,
  //   description: "You're not logged in",
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: "You're logged in and the user object is returned",
  // })
  @Get('/isAvailable')
  async isAvailable(@Query('name') name: string) {
    return this.nsService.subnameIsAvailable(name);
  }

  @Post('/createSubname')
  async createSubname(
    @Body()
    { name, safe, chain }: CreateSubname,
  ) {
    return this.nsService.createSubname(safe, name, chain);
  }

  @Get('/getSubname')
  async getSafeSubname(
    @Body()
    { safe }: GetSubname,
  ) {
    return this.nsService.getSafeSubname(safe);
  }
}
