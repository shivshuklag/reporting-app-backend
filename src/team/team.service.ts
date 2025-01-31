import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/team/entities/team.entity';
import { TeamStatusEnum } from 'src/team/enum/team_status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
  ) {}
  async getTeams() {
    return await this.teamRepo.find({
      where: { status: TeamStatusEnum.ACTIVE },
      select: ['id', 'name'],
    });
  }
}
