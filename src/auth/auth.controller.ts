import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { JwtProcessed } from './decorator/jwt-response.decorator';
import { JwtResponseInterface } from './interface/jwt.interface';
import { VerifyDto } from './dto/verify.dto';
import { ResendDto } from './dto/resend.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({
    summary:
      'Register a user by providing email and password, This is public api',
  })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.register(registerDto, response);
  }

  @Post('resend')
  @ApiOperation({ summary: "Resend an otp to user's emailId" })
  @ApiBearerAuth()
  async resend(
    @JwtProcessed() jwtDecoded: JwtResponseInterface,
    @Body() resendDto: ResendDto,
  ) {
    return await this.authService.resend(jwtDecoded?.id, resendDto?.emailId);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify the otp submitted by user' })
  @ApiBearerAuth()
  async verifyOtp(
    @JwtProcessed() jwtDecoded: JwtResponseInterface,
    @Body() verifyDto: VerifyDto,
  ) {
    return await this.authService.verifyOtp(jwtDecoded, verifyDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login an user to application' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(loginDto, response);
  }
}
