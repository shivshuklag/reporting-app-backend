import { Module } from '@nestjs/common';
import { CheckinsService } from './checkins.service';
import { CheckinsController } from './checkins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkins } from './entities/checkins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkins])],
  controllers: [CheckinsController],
  providers: [CheckinsService],
})
export class CheckinsModule {}
