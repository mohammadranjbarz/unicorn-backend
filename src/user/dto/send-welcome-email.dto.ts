import { IsEmail, IsString } from 'class-validator';

export class SendWelcomeEmailDto {
  @IsString()
  userId: string;

  @IsEmail()
  userEmail: string;

  @IsString()
  username: string;

  @IsString()
  subdomain: string;

  @IsString()
  walletAddress: string;
}
