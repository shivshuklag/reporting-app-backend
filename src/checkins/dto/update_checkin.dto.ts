import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCheckinDto {
  @IsString()
  @ApiProperty({ example: 'This is checkin id' })
  checkin_id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'This is previous day work' })
  prev_day_work: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'This is current day work' })
  current_day_work: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'No' })
  blocker: string;
}
