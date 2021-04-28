import { UserDto } from 'src/users/dto/User.dto';
import { User } from 'src/users/entities/User.entity';

export class JwtTokenPayload {
  public readonly sub: number;

  constructor(user: User | UserDto) {
    this.sub = user.id;
  }
}
