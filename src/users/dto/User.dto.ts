import { Allow } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserDto {
  @Allow()
  readonly id: number;

  @Allow()
  readonly email: string;

  @Allow()
  readonly firstName: string;

  @Allow()
  readonly lastName: string;

  constructor({ id, email, firstName, lastName }: User) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
