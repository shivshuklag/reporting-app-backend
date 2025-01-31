import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  emailId: string;

  @IsString()
  password: string;
}
