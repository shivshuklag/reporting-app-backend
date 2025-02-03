import { Controller, Get } from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'team', version: '1' })
@ApiTags('Team')
@ApiBearerAuth()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiOperation({ summary: 'Get the list of active teams' })
  async getTeams() {
    return await this.teamService.getTeams();
  }
}
