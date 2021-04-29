import { Injectable } from '@nestjs/common';
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

  async findOneByUserId(userId: number): Promise<PhdStudent | undefined> {
    return this.phdStudentsRepository.findOne(
      { userData: { id: userId } },
      { relations: ['userData'] }
    );
  }
}
