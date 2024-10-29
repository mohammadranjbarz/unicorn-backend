import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')?.[1]; // Assuming "Bearer <token>"

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET!);
      request['user'] = decoded; // Store the decoded user (including address) in the request object
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
