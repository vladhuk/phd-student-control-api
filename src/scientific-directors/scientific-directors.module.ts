import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhdStudentsModule } from 'src/phd-students/phd-students.module';
import { IndividualPlansModule } from 'src/individual-plans/individual-plans.module';
import { ScientificDirectorsService } from './scientific-directors.service';
import { ScientificDirectorsController } from './scientific-directors.controller';
import { ScientificDirector } from './entities/scientific-director.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScientificDirector]),
    forwardRef(() => PhdStudentsModule),
    IndividualPlansModule,
  ],
  controllers: [ScientificDirectorsController],
  providers: [ScientificDirectorsService],
  exports: [ScientificDirectorsService],
})
export class ScientificDirectorsModule {}
