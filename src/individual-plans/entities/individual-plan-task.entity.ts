import { DateAudit } from 'src/_common/base-entities/date-audit.base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attachment } from './attachment.entity';
import { IndividualPlan } from './individual-plan.entity';

@Entity('individual_plans_tasks')
export class IndividualPlanTask extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isCompleted: boolean;

  @Column()
  name: string;

  @ManyToOne(() => IndividualPlan)
  @JoinColumn({ name: 'individual_plan_id' })
  individualPlan: IndividualPlan;

  @OneToOne(() => Attachment)
  @JoinColumn({ name: 'attachment_id' })
  attachment: Attachment;
}
