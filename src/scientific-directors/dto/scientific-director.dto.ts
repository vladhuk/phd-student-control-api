import { Allow } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';

export class ScientificDirectorDto {
  @Allow()
  id: number;

  @Allow()
  userData: UserDto;
}
