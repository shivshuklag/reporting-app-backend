import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResendDto {
  @IsString()
  @ApiProperty({ example: 'abc@gmail.com' })
  emailId: string;
}
