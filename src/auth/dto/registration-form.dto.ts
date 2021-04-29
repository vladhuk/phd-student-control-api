import { IsDefined, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../enums/role';

export class RegistrationFormDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsEnum(Role)
  @IsDefined()
  readonly role: Role;
}
