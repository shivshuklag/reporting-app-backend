import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCheckinDto {
  @IsString()
  @ApiProperty({ example: 'This is previous day work' })
  prev_day_work: string;

  @IsString()
  @ApiProperty({ example: 'This is current day work' })
  current_day_work: string;

  @IsString()
  @ApiProperty({ example: 'No' })
  blocker: string;
}
