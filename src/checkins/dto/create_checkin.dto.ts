import { IsString } from 'class-validator';

export class CreateCheckinDto {
  @IsString()
  prev_day_work: string;

  @IsString()
  current_day_work: string;

  @IsString()
  blocker: string;
}
