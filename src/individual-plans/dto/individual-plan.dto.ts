import { Allow } from 'class-validator';
import { IndividualPlanTaskDto } from './individual-plan-task.dto';

export class IndividualPlanDto {
  @Allow()
  id: number;

  @Allow()
  tasks: IndividualPlanTaskDto[];
}
