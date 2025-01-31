import { Controller } from '@nestjs/common';
import { CheckinsService } from './checkins.service';

@Controller('checkins')
export class CheckinsController {
  constructor(private readonly checkinsService: CheckinsService) {}
}
