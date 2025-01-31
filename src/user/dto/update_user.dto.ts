import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum } from 'src/user/enum/user_role.enum';
import { UserStatusEnum } from 'src/user/enum/user_status.enum';

export class UpdateUserDto {
  @IsString()
  email_id: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsString()
  @IsEnum(UserRoleEnum)
  @IsOptional()
  user_role: string;

  @IsString()
  @IsEnum(UserStatusEnum)
  @IsOptional()
  user_status: string;

  @IsDate()
  @IsOptional()
  email_verified_at: Date;

  @IsString()
  onboarding_state: string;
}
