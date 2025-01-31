import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'abc@gmail.com' })
  @IsString()
  emailId: string;

  @ApiProperty({ example: 'secret' })
  @IsString()
  password: string;
}
