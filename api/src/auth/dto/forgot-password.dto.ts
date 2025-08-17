import { IsEmail, isString, IsString, IsUrl } from 'class-validator';

export class ForgotPasswordDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  url: string;
}
