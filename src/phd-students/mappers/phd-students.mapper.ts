import { Injectable } from '@nestjs/common';
import { ScientificDirectorDto } from 'src/scientific-directors/dto/scientific-director.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { Mapper } from 'src/_common/interfaces/mapper.interface';
import { PhdStudentDto } from '../dto/phd-student.dto';
import { PhdStudent } from '../entities/phd-student.entity';

@Injectable()
export class PhdStudentsMapper implements Mapper<PhdStudent, PhdStudentDto> {
  async entityToDto(student: PhdStudent): Promise<PhdStudentDto> {
    const studentDto = new PhdStudentDto();

    studentDto.id = student.id;
    studentDto.year = student.year;
    studentDto.userData = new UserDto(await student.userData);

    const director = await student.scientificDirector;
    const directorDto = new ScientificDirectorDto();

    directorDto.id = director.id;
    directorDto.userData = new UserDto(await director.userData);

    studentDto.scientificDirector = directorDto;

    return studentDto;
  }
}
