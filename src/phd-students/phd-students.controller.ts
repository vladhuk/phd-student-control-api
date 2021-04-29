import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { ForRole } from 'src/_common/decorators/for-role.decorator';
import { User } from 'src/_common/decorators/user.decorator';
import { Role } from 'src/_common/enums/role';
import { PhdStudentDto } from './dto/phd-student.dto';
import { PhdStudentsMapper } from './phd-students.mapper';
import { PhdStudentsService } from './phd-students.service';

@Controller('phd-students')
@ApiTags('PhD students API')
@ForRole(Role.SCIENTIFIC_DIRECTOR)
export class PhdStudentsController {
  constructor(
    private readonly phdStudentsService: PhdStudentsService,
    private readonly phdStudentsMapper: PhdStudentsMapper
  ) {}

  @Get('profile')
  async getProfile(@User() user: UserDto): Promise<PhdStudentDto> {
    const student = await this.phdStudentsService.findOneByUserIdOrThrow(
      user.id
    );
    return this.phdStudentsMapper.entityToDto(student);
  }

  // TODO:
  @Get('plan')
  getIndividualPlan() {}

  // TODO:
  @Get('plan/attachment')
  getIndividualPlanAttachment() {}

  // TODO:
  @Post('plan/attachment')
  uploadIndividualPlanAttachment() {}
}
