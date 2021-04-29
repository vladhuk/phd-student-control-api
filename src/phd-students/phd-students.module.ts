import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhdStudentsService } from './phd-students.service';
import { PhdStudentsController } from './phd-students.controller';
import { PhdStudent } from './entities/phd-student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhdStudent])],
  controllers: [PhdStudentsController],
  providers: [PhdStudentsService],
  exports: [PhdStudentsService],
})
export class PhdStudentsModule {}
