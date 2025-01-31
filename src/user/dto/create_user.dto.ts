import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum } from 'src/user/enum/user_role.enum';
import { UserStatusEnum } from 'src/user/enum/user_status.enum';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'abc@gmail.com' })
  email_id: string;

  @IsString()
  @ApiProperty({ example: 'secret' })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'John' })
  first_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @IsString()
  @IsEnum(UserRoleEnum)
  @ApiProperty({ example: 'normal' })
  user_role: string;

  @IsString()
  @IsEnum(UserStatusEnum)
  @ApiProperty({ example: 'active' })
  user_status: string;

  @IsDate()
  @ApiProperty({ example: '2024-01-01T00:00:00:000Z' })
  email_verified_at: Date;
}
