import { Allow } from 'class-validator';

export class IndividualPlanTaskDto {
  @Allow()
  id: number;

  @Allow()
  isCompleted: boolean;

  @Allow()
  attachmentName: string;
}
