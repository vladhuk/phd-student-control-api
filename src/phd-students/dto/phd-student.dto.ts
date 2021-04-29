import { ScientificDirectorDto } from 'src/scientific-directors/dto/scientific-director.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class PhdStudentDto {
  id: number;
  year: number;
  userData: UserDto;
  scientificDirector: ScientificDirectorDto;
}
