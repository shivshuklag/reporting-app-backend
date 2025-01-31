import { UserStatusEnum } from '../enum/user_status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoleEnum } from '../enum/user_role.enum';
import { OnboardingStateEnum } from '../enum/onboarding_state.enum';
import { Checkins } from '../../checkins/entities/checkins.entity';
import { Team } from '../../team/entities/team.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email_id: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    nullable: false,
    default: UserRoleEnum.NORMAL,
    type: 'enum',
    enum: UserRoleEnum,
  })
  role: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({
    nullable: false,
    default: UserStatusEnum.CREATED,
    type: 'enum',
    enum: UserStatusEnum,
  })
  status: string;

  @Column({ nullable: true })
  email_verified_at: Date;

  @Column({ nullable: true })
  team_id: string;

  @Column({
    nullable: false,
    default: OnboardingStateEnum.SIGNUP,
    type: 'enum',
    enum: OnboardingStateEnum,
  })
  onboarding_state: string;

  @OneToMany(() => Checkins, (checkins) => checkins.user)
  checkins: Checkins[];

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
