import { Allow } from 'class-validator';

export class AuthTokenDto {
  @Allow()
  readonly authToken: string;

  constructor(authToken) {
    this.authToken = authToken;
  }
}
