import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @ApiProperty({ example: 'abc@gmail.com' })
  emailId: string;

  @IsString()
  @ApiProperty({ example: 'secret' })
  password: string;
}
