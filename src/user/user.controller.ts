import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/user/dto/update_user.dto';
import { JwtProcessed } from 'src/auth/decorator/jwt-response.decorator';
import { JwtResponseInterface } from 'src/auth/interface/jwt.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('update')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @JwtProcessed() jwtDecoded: JwtResponseInterface,
  ) {
    return await this.userService.updateUser(jwtDecoded?.id, updateUserDto);
  }

  @Get('get')
  async getUser(@JwtProcessed() jwtDecoded: JwtResponseInterface) {
    return await this.userService.getUserById(jwtDecoded?.id);
  }
}
