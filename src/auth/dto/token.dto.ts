import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokenPayloadDto {
  @IsString()
  @ApiProperty({ example: 'uuid' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'abc@gmail.com' })
  emailId: string;
}
