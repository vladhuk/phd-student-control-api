import { PhdStudent } from 'src/phd-students/entities/phd-student.entity';
import { ScientificDirector } from 'src/scientific-directors/entities/scientific-director.entity';
import { DateAudit } from 'src/_common/base-entities/date-audit.base.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IndividualPlanTask } from './individual-plan-task.entity';

@Entity('individual_plans')
export class IndividualPlan extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PhdStudent)
  @JoinColumn({ name: 'phd_student_id' })
  phdStudent: PhdStudent;

  @OneToOne(() => ScientificDirector)
  @JoinColumn({ name: 'scientific_director_id' })
  scientificDirector: ScientificDirector;

  @OneToMany(() => IndividualPlanTask, (task) => task.individualPlan)
  tasks: IndividualPlanTask[];
}
