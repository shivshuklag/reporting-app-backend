import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtResponseInterface } from 'src/auth/interface/jwt.interface';
import { CreateCheckinDto } from 'src/checkins/dto/create_checkin.dto';
import { Checkins } from 'src/checkins/entities/checkins.entity';
import { ErrorMessage } from 'src/message/error.message';
import { SuccessMessage } from 'src/message/success.message';
import { Repository } from 'typeorm';

@Injectable()
export class CheckinsService {
  constructor(
    @InjectRepository(Checkins)
    private readonly checkinsRepo: Repository<Checkins>,
  ) {}

  async createCheckin(
    jwtDecoded: JwtResponseInterface,
    createCheckinDto: CreateCheckinDto,
  ) {
    try {
      await this.checkinsRepo.insert({
        ...createCheckinDto,
        user_id: jwtDecoded?.id,
      });
      return {
        status: SuccessMessage.SUCCESS,
        message: SuccessMessage.CHECKIN_SUCCESS,
      };
    } catch (err) {
      return {
        status: ErrorMessage.ERROR,
        message: err.message,
      };
    }
  }

  async fetchCheckin(jwtDecoded: JwtResponseInterface) {
    try {
      const checkins = await this.checkinsRepo.find({
        where: { user_id: jwtDecoded?.id },
        select: [
          'id',
          'prev_day_work',
          'current_day_work',
          'blocker',
          'created_at',
        ],
      });

      return {
        status: SuccessMessage.SUCCESS,
        checkins,
      };
    } catch (err) {
      return {
        status: ErrorMessage.ERROR,
        message: err.message,
      };
    }
  }
}
