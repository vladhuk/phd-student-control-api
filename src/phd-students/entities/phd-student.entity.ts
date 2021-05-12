import { IndividualPlan } from 'src/individual-plans/entities/individual-plan.entity';
import { ScientificDirector } from 'src/scientific-directors/entities/scientific-director.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('phd_students')
export class PhdStudent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userData: User;

  @ManyToOne(() => ScientificDirector)
  @JoinColumn({ name: 'scientific_director_id' })
  scientificDirector: ScientificDirector;

  @OneToOne(() => IndividualPlan, (plan) => plan.phdStudent)
  individualPlan: IndividualPlan;
}
