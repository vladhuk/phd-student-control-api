import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PhdStudentsService } from './phd-students.service';

@Controller('phd-students')
@ApiTags('PhD students API')
export class PhdStudentsController {
  constructor(private readonly phdStudentsService: PhdStudentsService) {}
}
