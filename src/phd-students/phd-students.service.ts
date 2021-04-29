import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/User.entity';
import { Repository } from 'typeorm';
import { CreatePhdStudentDto } from './dto/create-phd-student.dto';
import { UpdatePhdStudentDto } from './dto/update-phd-student.dto';
import { PhdStudent } from './entities/phd-student.entity';

@Injectable()
export class PhdStudentsService {
  constructor(
    @InjectRepository(PhdStudent)
    private readonly phdStudentsRepository: Repository<PhdStudent>
  ) {}

  createFromUser(user: User) {
    const phdStudent = new PhdStudent();

    phdStudent.userData = user;
    phdStudent.year = 1;

    return this.phdStudentsRepository.save(phdStudent);
  }
}
