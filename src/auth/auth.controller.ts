import {
  Controller,
  Get,
  Post,
  Logger,
  Res,
  Req,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UsersService } from 'src/user/users.service';
import { ApiResponse } from '@nestjs/swagger';
import { AuthedReq } from 'src/utils/types/AuthedReq.type';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyLoginPayloadParams } from '@thirdweb-dev/auth'; // Correct imports
import { verifyLoginPayload, buildLoginPayload } from '@thirdweb-dev/auth';

import { sign } from 'jsonwebtoken';
import { BuildLoginPayloadParams } from '@thirdweb-dev/auth/dist/declarations/src/core/schema/functions';
import {
  LoginOptions,
  LoginPayload,
} from '@thirdweb-dev/auth/src/core/schema/login';

@Controller({ path: 'auth' })
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  private readonly jwtSecret = process.env.JWT_SECRET!;

  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  @ApiResponse({
    status: 401,
    description: "You're not logged in",
  })
  @ApiResponse({
    status: 200,
    description: "You're logged in and the user object is returned",
  })
  @Get('/isLoggedIn')
  async isLoggedIn(@Req() req: AuthedReq) {
    return req.userId || 'no-user-found';
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    res.send('Logged out.');
  }

  /**
   * Get login payload (challenge)
   * This endpoint generates the login payload for the user to sign with their wallet.
   */
  @Get('/login')
  async getLoginPayload(@Req() req: AuthedReq, @Res() res: Response) {
    const { address, chainId } = req.query;
    if (!address || typeof address !== 'string') {
      throw new BadRequestException('Address is required');
    }

    try {
      // Generate the login payload (challenge)
      const loginPayload = await buildLoginPayload({
        wallet: {
          getAddress: () => {
            return address;
          },
          type: 'evm',
        } as any,
        options: {
          domain: process.env.CLIENT_DOMAIN as string,
          chainId: chainId as string,
        } as LoginOptions,
      } as BuildLoginPayloadParams);
      // const loginPayload = generateLoginPayload({
      //   domain: process.env.CLIENT_DOMAIN as string,
      // });
      console.log('loginPayload', loginPayload);
      res.status(200).json(loginPayload);
    } catch (error) {
      this.logger.error('Error generating login payload', error);
      throw new BadRequestException('Failed to generate login payload');
    }
  }

  /**
   * Verify signed payload and issue JWT
   * This endpoint verifies the signed payload and returns a JWT token if valid.
   */
  @Post('/login')
  async verifyLoginPayload(
    @Body()
    {
      address,
      signedPayload,
    }: { address: string; signedPayload: LoginPayload },
    @Res() res: Response,
  ) {
    if (!address || !signedPayload) {
      throw new BadRequestException('Address and signedPayload are required');
    }
    try {
      // Verify the signed payload
      const isValid = await verifyLoginPayload({
        payload: signedPayload,
        options: {
          domain: process.env.CLIENT_DOMAIN as string,
        },
        clientOptions: {},
      });

      if (!isValid) {
        throw new UnauthorizedException('Invalid signed payload');
      }

      // Issue JWT
      const token = sign({ address }, this.jwtSecret, {
        expiresIn: '30d', // JWT expiration time
      });

      res.status(200).json({ token });
    } catch (error) {
      this.logger.error('Error verifying signed payload', error);
      throw new UnauthorizedException('Failed to verify and generate token');
    }
  }
}
