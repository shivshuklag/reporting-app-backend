import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import Redis from 'ioredis';

describe('RedisService', () => {
  let service: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'REDIS_CLIENT',
          useFactory: () => {
            const redis = new Redis({
              host: 'localhost',
              port: 6379,
            });

            redis.on('connect', () =>
              console.log('Redis connected successfully'),
            );
            redis.on('error', (error) =>
              console.log('Redis connection error: ', error),
            );

            return redis;
          },
        },
        RedisService,
      ],
      exports: ['REDIS_CLIENT', RedisService],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
