import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScientificDirectorsModule } from 'src/scientific-directors/scientific-directors.module';
import { IndividualPlansModule } from 'src/individual-plans/individual-plans.module';
import { PhdStudentsService } from './phd-students.service';
import { PhdStudentsController } from './phd-students.controller';
import { PhdStudent } from './entities/phd-student.entity';
import { PhdStudentsMapper } from './mappers/phd-students.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhdStudent]),
    forwardRef(() => ScientificDirectorsModule),
    IndividualPlansModule,
  ],
  controllers: [PhdStudentsController],
  providers: [PhdStudentsService, PhdStudentsMapper],
  exports: [PhdStudentsService, PhdStudentsMapper],
})
export class PhdStudentsModule {}
