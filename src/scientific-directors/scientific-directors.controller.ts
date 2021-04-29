import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ForRole } from 'src/_common/decorators/for-role.decorator';
import { Role } from 'src/_common/enums/role';
import { ScientificDirectorsService } from './scientific-directors.service';

@Controller('scientific-directors')
@ApiTags('Scientific directors API')
@ForRole(Role.SCIENTIFIC_DIRECTOR)
export class ScientificDirectorsController {
  constructor(
    private readonly scientificDirectorsService: ScientificDirectorsService
  ) {}

  // TODO:
  @Get('phd-students')
  getPhdStudent() {}

  // TODO:
  @Get('phd-students/:id/plan')
  getPhdStudentIndividualPlan() {}

  // TODO:
  @Post('phd-students/:id/plan/tasks/id/approve')
  approveIndividualPlanTask() {}
}
