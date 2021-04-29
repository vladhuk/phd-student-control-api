import { IsNotEmpty } from 'class-validator';

export class LoginFormDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
