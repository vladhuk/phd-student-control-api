import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ForRole } from 'src/_common/decorators/for-role.decorator';
import { Role } from 'src/_common/enums/role';
import { PhdStudentsService } from './phd-students.service';

@Controller('phd-students')
@ApiTags('PhD students API')
@ForRole(Role.SCIENTIFIC_DIRECTOR)
export class PhdStudentsController {
  constructor(private readonly phdStudentsService: PhdStudentsService) {}
}
