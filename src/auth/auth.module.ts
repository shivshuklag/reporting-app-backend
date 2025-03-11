import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { RedisModule } from '../redis/redis.module';
import { MailerModule } from '../mailer/mailer.module';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { JwtRefreshAuthGuard } from '../auth/guard/jwt-refresh-auth.guard';
import { JwtRefreshStrategy } from '../auth/strategy/jwt-rt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => RedisModule),
    forwardRef(() => MailerModule),
    forwardRef(() => RedisModule),
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
})
export class AuthModule {}
