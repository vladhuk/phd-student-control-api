import { Injectable } from '@nestjs/common';
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
}
