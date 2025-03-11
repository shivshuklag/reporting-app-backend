import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtResponseInterface } from '../auth/interface/jwt.interface';
import { CreateCheckinDto } from './dto/create_checkin.dto';
import { UpdateCheckinDto } from './dto/update_checkin.dto';
import { Checkins } from './entities/checkins.entity';
import { ErrorMessage } from '../message/error.message';
import { SuccessMessage } from '../message/success.message';
import { getCurrentDateAtMidnight } from '../utils/get_date_only.util';
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
      const createCheckin = await this.checkinsRepo.insert({
        ...createCheckinDto,
        user_id: jwtDecoded?.id,
      });
      return {
        status: SuccessMessage.SUCCESS,
        message: SuccessMessage.CHECKIN_SUCCESS,
        checkin_id: createCheckin.generatedMaps[0].id,
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
        order: {
          created_at: 'DESC',
        },
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

  async updateCheckin(
    jwtDecoded: JwtResponseInterface,
    updateCheckinDto: UpdateCheckinDto,
  ) {
    const checkin = await this.checkinsRepo.findOne({
      where: { id: updateCheckinDto?.checkin_id, user_id: jwtDecoded?.id },
    });

    if (!checkin) {
      throw new BadRequestException(ErrorMessage.Invalid);
    }

    try {
      await this.checkinsRepo.update(
        { id: updateCheckinDto?.checkin_id },
        {
          prev_day_work: updateCheckinDto?.prev_day_work,
          current_day_work: updateCheckinDto?.current_day_work,
          blocker: updateCheckinDto?.blocker,
        },
      );
      return {
        status: SuccessMessage.SUCCESS,
        message: SuccessMessage.CHECKIN_UPDATE_SUCCESS,
      };
    } catch (err) {
      return {
        status: ErrorMessage.ERROR,
        message: err.message,
      };
    }
  }

  async checkinStatus(jwtDecoded: JwtResponseInterface) {
    const checkin = await this.checkinsRepo.findOne({
      where: { user_id: jwtDecoded?.id },
      order: { created_at: 'DESC' },
    });

    if (checkin.created_at > new Date(getCurrentDateAtMidnight())) {
      return {
        status: SuccessMessage.SUCCESS,
      };
    }

    return {
      status: SuccessMessage.FALSE,
    };
  }
}
