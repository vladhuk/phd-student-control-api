import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PhdStudent } from './entities/phd-student.entity';

@Injectable()
export class PhdStudentsService {
  constructor(
    @InjectRepository(PhdStudent)
    private readonly phdStudentsRepository: Repository<PhdStudent>
  ) {}

  async createFromUser(user: User): Promise<PhdStudent> {
    const phdStudent = new PhdStudent();

    phdStudent.userData = user;
    phdStudent.year = 1;

    return this.phdStudentsRepository.save(phdStudent);
  }

  async findOneByUserId(userId: number): Promise<PhdStudent> {
    const student = await this.phdStudentsRepository.findOne(
      { userData: { id: userId } },
      {
        relations: [
          'userData',
          'scientificDirector',
          'scientificDirector.userData',
          'individualPlan',
        ],
      }
    );

    if (!student) {
      throw new NotFoundException(
        `PhD student with userId=${userId} not found`
      );
    }

    return student;
  }

  async findOneByStudentIdAndScientificDirectorId(
    studentId: number,
    directorId: number
  ): Promise<PhdStudent> {
    const student = await this.phdStudentsRepository.findOne(
      {
        userData: { id: studentId },
        scientificDirector: { id: directorId },
      },
      {
        relations: [
          'userData',
          'scientificDirector',
          'individualPlan',
          'individualPlan.tasks',
          'individualPlan.tasks.attachment',
        ],
      }
    );

    if (!student) {
      throw new NotFoundException(
        `PhD student with userId=${studentId} and directorId=${directorId} not found`
      );
    }

    return student;
  }
}
