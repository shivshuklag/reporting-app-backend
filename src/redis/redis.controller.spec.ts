import { Test, TestingModule } from '@nestjs/testing';
import { RedisController } from './redis.controller';
import { RedisService } from './redis.service';
import Redis from 'ioredis';

describe('RedisController', () => {
  let controller: RedisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedisController],
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

    controller = module.get<RedisController>(RedisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
