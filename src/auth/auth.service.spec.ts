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

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => UserModule),
        forwardRef(() => RedisModule),
        forwardRef(() => MailerModule),
        forwardRef(() => JwtModule),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtAuthGuard,
        JwtStrategy,
        JwtRefreshAuthGuard,
        JwtRefreshStrategy,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
