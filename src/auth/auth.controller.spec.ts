import { MailerModule } from '@nestjs-modules/mailer';
import { forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisModule } from '../redis/redis.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';
import { JwtRefreshStrategy } from './strategy/jwt-rt.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtAuthGuard,
        JwtStrategy,
        JwtRefreshAuthGuard,
        JwtRefreshStrategy,
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
