import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/auth/decorator/public.decorator';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Response } from 'express';
import { JwtProcessed } from 'src/auth/decorator/jwt-response.decorator';
import { JwtResponseInterface } from 'src/auth/interface/jwt.interface';
import { VerifyDto } from 'src/auth/dto/verify.dto';
import { ResendDto } from 'src/auth/dto/resend.dto';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { LoginDto } from 'src/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.register(registerDto, response);
  }

  @Post('resend')
  async resend(
    @JwtProcessed() jwtDecoded: JwtResponseInterface,
    @Body() resendDto: ResendDto,
  ) {
    return await this.authService.resend(jwtDecoded?.id, resendDto?.emailId);
  }

  @Post('verify')
  async verifyOtp(
    @JwtProcessed() jwtDecoded: JwtResponseInterface,
    @Body() verifyDto: VerifyDto,
  ) {
    return await this.authService.verifyOtp(jwtDecoded, verifyDto);
  }

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(loginDto, response);
  }
}
