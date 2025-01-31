import { Controller, Get } from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'team', version: '1' })
@ApiTags('Team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiOperation({ summary: 'Get the list of active teams' })
  async getTeams() {
    return await this.teamService.getTeams();
  }
}
