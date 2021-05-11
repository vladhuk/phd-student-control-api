import { Allow } from 'class-validator';

export class IndividualPlanTaskDto {
  @Allow()
  id: number;

  @Allow()
  name: string;

  @Allow()
  isCompleted: boolean;

  @Allow()
  attachmentName: string;
}
