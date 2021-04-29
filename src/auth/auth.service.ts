import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { classToPlain } from 'class-transformer';
import { PhdStudentsService } from 'src/phd-students/phd-students.service';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthTokenDto } from './dto/auth-token.dto';
import { RegistrationFormDto } from './dto/registration-form.dto';
import { JwtTokenPayload } from './utils/jwt-token-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly phdStudentsService: PhdStudentsService
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
    await this.phdStudentsService.createFromUser(savedUser);

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
