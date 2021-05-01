import { Allow } from 'class-validator';

export class AuthTokenDto {
  @Allow()
  readonly authToken: string;

  constructor(authToken: string) {
    this.authToken = authToken;
  }
}
