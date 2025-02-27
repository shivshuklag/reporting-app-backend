import { User } from '../../user/entities/user.entity';
import { TeamStatusEnum } from '../enum/team_status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('team')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({
    nullable: false,
    default: TeamStatusEnum.ACTIVE,
    type: 'enum',
    enum: TeamStatusEnum,
  })
  status: string;

  @OneToMany(() => User, (user) => user.team)
  user: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
