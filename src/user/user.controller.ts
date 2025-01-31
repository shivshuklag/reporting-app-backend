import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/user/dto/update_user.dto';
import { JwtProcessed } from 'src/auth/decorator/jwt-response.decorator';
import { JwtResponseInterface } from 'src/auth/interface/jwt.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'user', version: '1' })
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('update')
  @ApiOperation({ summary: 'Update or edit the user details' })
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @JwtProcessed() jwtDecoded: JwtResponseInterface,
  ) {
    return await this.userService.updateUser(jwtDecoded?.id, updateUserDto);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get the user details' })
  async getUser(@JwtProcessed() jwtDecoded: JwtResponseInterface) {
    return await this.userService.getUserById(jwtDecoded?.id);
  }
}
