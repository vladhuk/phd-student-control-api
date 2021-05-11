import { Injectable } from '@nestjs/common';
import { Mapper } from 'src/_common/interfaces/mapper.interface';
import { IndividualPlanTaskDto } from '../dto/individual-plan-task.dto';
import { IndividualPlanDto } from '../dto/individual-plan.dto';
import { IndividualPlan } from '../entities/individual-plan.entity';

@Injectable()
export class IndividualPlansMapper
  implements Mapper<IndividualPlan, IndividualPlanDto> {
  async entityToDto(
    individualPlan: IndividualPlan
  ): Promise<IndividualPlanDto> {
    const individualPlanDto = new IndividualPlanDto();

    individualPlanDto.id = individualPlan.id;

    const individualPlanTasks = await individualPlan.tasks;

    individualPlanDto.tasks = await Promise.all(
      individualPlanTasks.map(async (task) => {
        const individualPlanTaskDto = new IndividualPlanTaskDto();

        individualPlanTaskDto.id = task.id;
        individualPlanTaskDto.name = task.name;
        individualPlanTaskDto.attachmentName = (await task.attachment).fileName;
        individualPlanTaskDto.isCompleted = task.isCompleted;

        return individualPlanTaskDto;
      })
    );

    return individualPlanDto;
  }
}
