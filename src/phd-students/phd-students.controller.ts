import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IndividualPlanDto } from 'src/individual-plans/dto/individual-plan.dto';
import { IndividualPlansService } from 'src/individual-plans/individual-plans.service';
import { IndividualPlansMapper } from 'src/individual-plans/mappers/individual-plans.mapper';
import { UserDto } from 'src/users/dto/user.dto';
import { ForRole } from 'src/_common/decorators/for-role.decorator';
import { User } from 'src/_common/decorators/user.decorator';
import { Role } from 'src/_common/enums/role';
import { PhdStudentDto } from './dto/phd-student.dto';
import { PhdStudentsMapper } from './mappers/phd-students.mapper';
import { PhdStudentsService } from './phd-students.service';

@Controller('phd-students')
@ApiTags('PhD students API')
@ForRole(Role.SCIENTIFIC_DIRECTOR)
export class PhdStudentsController {
  constructor(
    private readonly phdStudentsService: PhdStudentsService,
    private readonly phdStudentsMapper: PhdStudentsMapper,
    private readonly individualPlansService: IndividualPlansService,
    private readonly individualPlansMapper: IndividualPlansMapper
  ) {}

  @Get('profile')
  async getProfile(@User() user: UserDto): Promise<PhdStudentDto> {
    const student = await this.phdStudentsService.findOneByUserIdOrThrow(
      user.id
    );
    return this.phdStudentsMapper.entityToDto(student);
  }

  @Get('plan')
  async getIndividualPlan(@User() user: UserDto): Promise<IndividualPlanDto> {
    const individualPlan = await this.individualPlansService.findIndividualPlanByPhdStudentId(
      user.id
    );
    return this.individualPlansMapper.entityToDto(individualPlan);
  }

  // TODO:
  @Get('plan/attachment')
  getIndividualPlanAttachment() {}

  // TODO:
  @Post('plan/attachment')
  uploadIndividualPlanAttachment() {}
}
