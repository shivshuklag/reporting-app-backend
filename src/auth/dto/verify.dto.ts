import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyDto {
  @IsString()
  @ApiProperty({ example: '123456' })
  otp: string;
}
