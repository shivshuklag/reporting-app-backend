import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { TokenPayloadDto } from 'src/auth/dto/token.dto';
import { Token } from 'src/auth/interface/token.interface';
import { configService } from 'src/config/config.service';
import { ErrorMessage } from 'src/message/error.message';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { EnvironmentEnum } from 'src/auth/enum/environment.enum';
import { JwtResponseInterface } from 'src/auth/interface/jwt.interface';
import { VerifyDto } from 'src/auth/dto/verify.dto';
import { generateOtp } from 'src/utils/generate_otp.util';
import { MailerService } from '@nestjs-modules/mailer';
import { OTP_TEMPALTE } from 'src/mailer/templates/otp.template';
import { SuccessMessage } from 'src/message/success.message';
import { getCurrentDateTimeIST } from 'src/utils/ist_date_time.util';
import { LoginDto } from 'src/auth/dto/login.dto';
import { verifyHash } from 'src/utils/verify_hash.util';
import { RedisService } from 'src/redis/redis.service';
import { generateHash } from 'src/utils/hash_string.util';
import { OnboardingStateEnum } from 'src/user/enum/onboarding_state.enum';

export const cookieOptions = {
  sameSite: 'none' as const,
  secure: true,
  httpOnly: false,
  domain:
    configService.getValue('MODE') === EnvironmentEnum.PROD
      ? configService.getValue('COOKIE_DOMAIN')
      : null,
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private redisService: RedisService,
  ) {}
  async register(registerDto: RegisterDto, response: Response) {
    const createdUser = await this.userService.createUser({
      email_id: registerDto?.emailId,
      password: await generateHash(registerDto?.password),
    });

    const tokenPayload: TokenPayloadDto = {
      id: createdUser?.id,
      emailId: registerDto?.emailId,
      role: createdUser?.role,
    };

    // Send otp
    await this.sendOtp(createdUser?.id, registerDto?.emailId);

    const tokens: Token = await this.getTokens(tokenPayload);

    response.cookie('accessToken', tokens?.accessToken, {
      expires: new Date(
        Date.now() +
          +configService.getValue('COOKIE_EXPIRES_IN') * 24 * 60 * 60 * 1000,
      ),
      ...cookieOptions,
    });
    response.cookie('refreshToken', tokens?.refreshToken, {
      expires: new Date(
        Date.now() +
          +configService.getValue('COOKIE_EXPIRES_IN') * 24 * 60 * 60 * 1000,
      ),
      ...cookieOptions,
    });

    return {
      status: SuccessMessage.SUCCESS,
      message: SuccessMessage.REGSITER_MESSAGE,
    };
  }

  async login(loginDto: LoginDto, response: Response) {
    const user = await this.userService.getUserByEmail(loginDto?.emailId);

    if (!user) {
      return {
        status: ErrorMessage.ERROR,
        message: ErrorMessage.Account_Not_Found,
      };
    }

    const passwordMatch = verifyHash(loginDto?.password, user?.password);

    if (!passwordMatch) {
      return {
        status: ErrorMessage.ERROR,
        message: ErrorMessage.AUTHENTICATION_ERROR,
      };
    }

    const tokenPayload: TokenPayloadDto = {
      id: user?.id,
      emailId: loginDto?.emailId,
      role: user?.role,
    };

    const tokens: Token = await this.getTokens(tokenPayload);

    response.cookie('accessToken', tokens?.accessToken, {
      expires: new Date(
        Date.now() +
          +configService.getValue('COOKIE_EXPIRES_IN') * 24 * 60 * 60 * 1000,
      ),
      ...cookieOptions,
    });
    response.cookie('refreshToken', tokens?.refreshToken, {
      expires: new Date(
        Date.now() +
          +configService.getValue('COOKIE_EXPIRES_IN') * 24 * 60 * 60 * 1000,
      ),
      ...cookieOptions,
    });

    return {
      status: SuccessMessage.SUCCESS,
      message: SuccessMessage.LOGIN_MESSAGE,
    };
  }

  async verifyOtp(jwtDecoded: JwtResponseInterface, verifyDto: VerifyDto) {
    if (configService.getValue('ENV') == 'dev') {
      return {
        status: SuccessMessage.SUCCESS,
        message: SuccessMessage.OTP_VERIFICATION_MESSAGE,
      };
    }
    const storedOtp = await this.redisService.getCache(`otp:${jwtDecoded?.id}`);
    if (!storedOtp) return false;

    const isValid = storedOtp === verifyDto?.otp;

    if (isValid) {
      // Remove OTP from cache after successful verification
      await this.redisService.delCache(`otp:${jwtDecoded?.id}`);
      await this.userService.updateUser(jwtDecoded?.id, {
        email_verified_at: getCurrentDateTimeIST(),
        onboarding_state: OnboardingStateEnum.VERIFIED,
      });
      return {
        status: SuccessMessage.SUCCESS,
        message: SuccessMessage.OTP_VERIFICATION_MESSAGE,
      };
    }

    return {
      status: ErrorMessage.ERROR,
      message: ErrorMessage.OTP_VERIFICATION_ERROR,
    };
  }

  async resend(userId: string, emailId: string) {
    try {
      await this.sendOtp(userId, emailId);
      return {
        status: SuccessMessage.SUCCESS,
        message: SuccessMessage.OTP_MESSAGE,
      };
    } catch (err) {
      return { status: ErrorMessage.ERROR, message: err?.message };
    }
  }

  async validateUser(userName: string, password: string) {
    return 'User';
  }

  async getTokens(payload: TokenPayloadDto) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: configService.getValue('JWT_SECRET'),
      expiresIn: configService.getValue('JWT_EXPIRY'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: configService.getValue('JWT_REFRESH_SECRET'),
      expiresIn: configService.getValue('JWT_REFRESH_EXPIRY'),
    });

    return { accessToken, refreshToken };
  }

  async sendOtp(userId: string, emailId: string) {
    const otp = generateOtp(6);
    const ttl = 300;

    // Store OTP in Redis with expiration
    await this.redisService.setCache(`otp:${userId}`, otp, ttl);

    // You would typically send the OTP to the user via email/SMS here
    try {
      await this.mailerService.sendMail({
        from: {
          name: 'Daily reporting App',
          address: 'shivshuklag@gmail.com',
        },
        to: emailId,
        subject: 'Your OTP code',
        html: OTP_TEMPALTE.replace('{{otp}}', otp),
      });
    } catch (err) {
      console.error(`Error while sending otp: `, err);
    }
  }
}
