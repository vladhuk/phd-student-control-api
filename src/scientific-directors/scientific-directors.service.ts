import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ScientificDirector } from './entities/scientific-director.entity';

@Injectable()
export class ScientificDirectorsService {
  constructor(
    @InjectRepository(ScientificDirector)
    private readonly scientificDirectorsRepository: Repository<ScientificDirector>
  ) {}

  async createFromUser(user: User): Promise<ScientificDirector> {
    const scientificDirector = new ScientificDirector();

    scientificDirector.userData = user;

    return this.scientificDirectorsRepository.save(scientificDirector);
  }

  async findOneByUserId(userId: number): Promise<ScientificDirector> {
    const director = await this.scientificDirectorsRepository.findOne(
      { userData: { id: userId } },
      {
        relations: [
          'userData',
          'phdStudents',
          'phdStudents.userData',
          'phdStudents.scientificDirector',
          'phdStudents.scientificDirector.userData',
        ],
      }
    );

    if (!director) {
      throw new NotFoundException(
        `Scientific director with userId=${userId} not found`
      );
    }

    return director;
  }
}
