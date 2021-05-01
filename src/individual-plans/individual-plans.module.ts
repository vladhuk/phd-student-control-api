import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';
import { IndividualPlanTask } from './entities/individual-plan-task.entity';
import { IndividualPlan } from './entities/individual-plan.entity';
import { IndividualPlansMapper } from './mappers/individual-plans.mapper';
import { IndividualPlansService } from './individual-plans.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IndividualPlan, IndividualPlanTask, Attachment]),
  ],
  providers: [IndividualPlansMapper, IndividualPlansService],
  exports: [IndividualPlansService, IndividualPlansMapper],
})
export class IndividualPlansModule {}
