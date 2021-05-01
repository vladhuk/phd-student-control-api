import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IndividualPlan } from './entities/individual-plan.entity';

@Injectable()
export class IndividualPlansService {
  constructor(
    @InjectRepository(IndividualPlan)
    private readonly individualPlanRepository: Repository<IndividualPlan>
  ) {}

  findIndividualPlanByPhdStudentId(
    phdStudentId: number
  ): Promise<IndividualPlan | undefined> {
    return this.individualPlanRepository.findOne(
      { phdStudent: { id: phdStudentId } },
      { relations: ['phdStudent'] }
    );
  }
}
