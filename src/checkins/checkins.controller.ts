import { Body, Controller, Get, Post } from '@nestjs/common';
import { CheckinsService } from './checkins.service';
import { JwtProcessed } from 'src/auth/decorator/jwt-response.decorator';
import { JwtResponseInterface } from 'src/auth/interface/jwt.interface';
import { CreateCheckinDto } from 'src/checkins/dto/create_checkin.dto';

@Controller('checkins')
export class CheckinsController {
  constructor(private readonly checkinsService: CheckinsService) {}

  @Post('create')
  async createCheckin(
    @JwtProcessed() jwtDecoded: JwtResponseInterface,
    @Body() createCheckinDto: CreateCheckinDto,
  ) {
    return await this.checkinsService.createCheckin(
      jwtDecoded,
      createCheckinDto,
    );
  }

  @Get('fetch')
  async fetchCheckin(@JwtProcessed() jwtDecoded: JwtResponseInterface) {
    return await this.checkinsService.fetchCheckin(jwtDecoded);
  }
}
