import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckinsController } from './checkins.controller';
import { CheckinsService } from './checkins.service';
import { Checkins } from './entities/checkins.entity';

describe('CheckinsController', () => {
  let controller: CheckinsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Checkins])],
      controllers: [CheckinsController],
      providers: [CheckinsService],
    }).compile();

    controller = module.get<CheckinsController>(CheckinsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
