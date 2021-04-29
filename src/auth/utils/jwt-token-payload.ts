import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';

export class JwtTokenPayload {
  public readonly sub: number;

  constructor(user: User | UserDto) {
    this.sub = user.id;
  }
}
