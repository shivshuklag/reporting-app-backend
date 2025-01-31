import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessMessage } from 'src/message/success.message';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { UpdateUserDto } from 'src/user/dto/update_user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getUserByEmail(emailId: string) {
    const user = await this.userRepo.findOne({
      where: { email_id: emailId },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async createUser(createUserDto: Partial<CreateUserDto>) {
    const user = await this.userRepo.insert({
      email_id: createUserDto?.email_id,
      password: createUserDto?.password,
    });

    if (!user) {
      return null;
    }

    return user?.generatedMaps[0];
  }

  async updateUser(userId: string, payload: Partial<UpdateUserDto>) {
    await this.userRepo.update({ id: userId }, payload);

    return {
      status: SuccessMessage.SUCCESS,
      message: SuccessMessage.PROFILE_UPDATE_MESSAGE,
    };
  }

  async getUserById(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
