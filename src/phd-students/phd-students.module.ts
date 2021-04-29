import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScientificDirectorsModule } from 'src/scientific-directors/scientific-directors.module';
import { PhdStudentsService } from './phd-students.service';
import { PhdStudentsController } from './phd-students.controller';
import { PhdStudent } from './entities/phd-student.entity';
import { PhdStudentsMapper } from './phd-students.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([PhdStudent]), ScientificDirectorsModule],
  controllers: [PhdStudentsController],
  providers: [PhdStudentsService, PhdStudentsMapper],
  exports: [PhdStudentsService],
})
export class PhdStudentsModule {}
