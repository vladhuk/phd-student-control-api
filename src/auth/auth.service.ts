import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { classToPlain } from 'class-transformer';
import { UserDto } from 'src/users/dto/User.dto';
import { User } from 'src/users/entities/User.entity';
import { UsersService } from 'src/users/users.service';
import { AuthTokenDto } from './dto/AuthToken.dto';
import { RegistrationFormDto } from './dto/RegistrationForm.dto';
import { JwtTokenPayload } from './utils/JwtTokenPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async registerUser(
    registrationFormDto: RegistrationFormDto
  ): Promise<AuthTokenDto> {
    const user = new User();

    user.firstName = registrationFormDto.firstName;
    user.lastName = registrationFormDto.lastName;
    user.email = registrationFormDto.email;
    user.password = await hash(registrationFormDto.password, 10);

    const savedUser = await this.usersService.create(user);

    const accessToken = await this.generateAccessToken(savedUser);

    return new AuthTokenDto(accessToken);
  }

  async validateAndGetUser(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async generateAccessToken(user: User | UserDto): Promise<string> {
    const payload = new JwtTokenPayload(user);

    return this.jwtService.sign(classToPlain(payload));
  }
}
