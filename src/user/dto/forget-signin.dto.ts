import { IsEmail, IsString } from 'class-validator';

export class ForgotSignInDto {
  @IsEmail()
  email: string;
}
