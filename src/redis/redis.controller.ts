import { Controller } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller({ path: 'redis', version: '1' })
export class RedisController {
  constructor(private readonly redisService: RedisService) {}
}
