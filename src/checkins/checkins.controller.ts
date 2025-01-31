import { Body, Controller, Get, Post } from '@nestjs/common';
import { CheckinsService } from './checkins.service';
import { JwtProcessed } from 'src/auth/decorator/jwt-response.decorator';
import { JwtResponseInterface } from 'src/auth/interface/jwt.interface';
import { CreateCheckinDto } from 'src/checkins/dto/create_checkin.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'checkins', version: '1' })
@ApiTags('Check Ins')
export class CheckinsController {
  constructor(private readonly checkinsService: CheckinsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create checkins for a user' })
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
  @ApiOperation({ summary: 'Fetch the chekins submitted by users' })
  async fetchCheckin(@JwtProcessed() jwtDecoded: JwtResponseInterface) {
    return await this.checkinsService.fetchCheckin(jwtDecoded);
  }
}
