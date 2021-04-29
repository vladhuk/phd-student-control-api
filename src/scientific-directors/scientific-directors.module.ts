import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScientificDirectorsService } from './scientific-directors.service';
import { ScientificDirectorsController } from './scientific-directors.controller';
import { ScientificDirector } from './entities/scientific-director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScientificDirector])],
  controllers: [ScientificDirectorsController],
  providers: [ScientificDirectorsService],
  exports: [ScientificDirectorsService],
})
export class ScientificDirectorsModule {}
