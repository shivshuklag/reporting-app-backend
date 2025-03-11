import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum } from '../enum/user_role.enum';
import { UserStatusEnum } from '../enum/user_status.enum';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({ example: 'abc@gmail.com' })
  @IsOptional()
  email_id: string;

  @IsString()
  @IsOptional()
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
  @IsOptional()
  @ApiProperty({ example: 'active' })
  user_role: string;

  @IsString()
  @IsEnum(UserStatusEnum)
  @IsOptional()
  @ApiProperty({ example: 'active' })
  user_status: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ example: '2024-01-01T00:00:00:000Z' })
  email_verified_at: Date;

  @IsString()
  @ApiProperty({ example: 'signup' })
  @IsOptional()
  onboarding_state: string;
}
