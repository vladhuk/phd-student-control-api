import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScientificDirectorsService } from './scientific-directors.service';

@Controller('scientific-directors')
@ApiTags('Scientific directors API')
export class ScientificDirectorsController {
  constructor(
    private readonly scientificDirectorsService: ScientificDirectorsService
  ) {}
}
