import {
  Controller,
  Get,
  Param,
  Post,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiProduces, ApiTags } from '@nestjs/swagger';
import { IndividualPlanDto } from 'src/individual-plans/dto/individual-plan.dto';
import { CheckTaskOnUserGuard } from 'src/phd-students/guards/check-task-on-user.guard';
import { IndividualPlansService } from 'src/individual-plans/individual-plans.service';
import { IndividualPlansMapper } from 'src/individual-plans/mappers/individual-plans.mapper';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/_common/decorators/user.decorator';
import { ForRole } from 'src/_common/decorators/for-role.decorator';
import { FileUploadDto } from 'src/_common/dto/file-upload.dto';
import { Role } from 'src/_common/enums/role';
import { PhdStudentDto } from './dto/phd-student.dto';
import { PhdStudentsMapper } from './mappers/phd-students.mapper';
import { PhdStudentsService } from './phd-students.service';

@Controller('phd-students/me')
@ApiTags('PhD students API')
@ForRole(Role.SCIENTIFIC_DIRECTOR)
export class PhdStudentsController {
  constructor(
    private readonly phdStudentsService: PhdStudentsService,
    private readonly phdStudentsMapper: PhdStudentsMapper,
    private readonly individualPlansService: IndividualPlansService,
    private readonly individualPlansMapper: IndividualPlansMapper
  ) {}

  @Get()
  async getProfile(@User() user: UserDto): Promise<PhdStudentDto> {
    const student = await this.phdStudentsService.findOneByUserIdOrThrow(
      user.id
    );
    return this.phdStudentsMapper.entityToDto(student);
  }

  @Get('plan')
  async getIndividualPlan(@User() user: UserDto): Promise<IndividualPlanDto> {
    const phdStudent = await this.phdStudentsService.findOneByUserId(user.id);
    const individualPlan = await phdStudent.individualPlan;

    return this.individualPlansMapper.entityToDto(individualPlan);
  }

  @Get('plan/:taskId/attachment')
  @UseGuards(CheckTaskOnUserGuard)
  @ApiProduces('application/octet-stream')
  async getIndividualPlanAttachment(
    @Param('taskId') taskId: number,
    @Response() res
  ) {
    const attachmentPath = await this.individualPlansService.getAttachmentPathByTaskId(
      taskId
    );
    return res.download(attachmentPath);
  }

  @Post('plan/:taskId/attachment')
  @UseGuards(CheckTaskOnUserGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Individual plan attachment',
    type: FileUploadDto,
  })
  async uploadIndividualPlanAttachment(
    @Param('taskId') taskId: number,
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    return this.individualPlansService.addAttachmentToTask(
      taskId,
      file.filename,
      file.buffer
    );
  }
}
