import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserRoleEnum } from 'src/user/enum/user_role.enum';

export class TokenPayloadDto {
  @IsString()
  @ApiProperty({ example: 'uuid' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'abc@gmail.com' })
  emailId: string;

  @IsEnum(UserRoleEnum)
  role: string;
}
