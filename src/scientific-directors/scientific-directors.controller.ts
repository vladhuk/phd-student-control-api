import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IndividualPlanDto } from 'src/individual-plans/dto/individual-plan.dto';
import { IndividualPlansService } from 'src/individual-plans/individual-plans.service';
import { IndividualPlansMapper } from 'src/individual-plans/mappers/individual-plans.mapper';
import { PhdStudentDto } from 'src/phd-students/dto/phd-student.dto';
import { PhdStudentsMapper } from 'src/phd-students/mappers/phd-students.mapper';
import { PhdStudentsService } from 'src/phd-students/phd-students.service';
import { UserDto } from 'src/users/dto/user.dto';
import { ForRole } from 'src/_common/decorators/for-role.decorator';
import { User } from 'src/_common/decorators/user.decorator';
import { Role } from 'src/_common/enums/role';
import { DirectorHasStudentWithTask } from './guards/director-has-student-with-task';
import { ScientificDirectorsService } from './scientific-directors.service';

@Controller('scientific-directors/me')
@ApiTags('Scientific directors API')
@ForRole(Role.SCIENTIFIC_DIRECTOR)
export class ScientificDirectorsController {
  constructor(
    private readonly scientificDirectorsService: ScientificDirectorsService,
    private readonly phdStudentService: PhdStudentsService,
    private readonly phdStudentsMapper: PhdStudentsMapper,
    private readonly individualPlansService: IndividualPlansService,
    private readonly individualPlansMapper: IndividualPlansMapper
  ) {}

  @Get('phd-students')
  async getPhdStudent(@User() user: UserDto): Promise<PhdStudentDto[]> {
    const director = await this.scientificDirectorsService.findOneByUserId(
      user.id
    );
    const students = await director.phdStudents;

    return Promise.all(students.map(this.phdStudentsMapper.entityToDto));
  }

  @Get('phd-students/:studentId/plan')
  async getPhdStudentIndividualPlan(
    @User() user: UserDto,
    @Param('studentId') studentId: number
  ): Promise<IndividualPlanDto> {
    const student = await this.phdStudentService.findOneByStudentIdAndScientificDirectorId(
      studentId,
      user.id
    );
    const plan = await student.individualPlan;
    return this.individualPlansMapper.entityToDto(plan);
  }

  @Post('phd-students/:studentId/plan/tasks/:taskId/approve')
  @UseGuards(DirectorHasStudentWithTask)
  async approveIndividualPlanTask(
    @Param('taskId') taskId: number
  ): Promise<void> {
    return this.individualPlansService.approveTask(taskId);
  }
}
