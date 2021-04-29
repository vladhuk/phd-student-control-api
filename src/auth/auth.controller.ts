import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/User.dto';
import { SkipJwtAuth } from 'src/_common/decorators/SkipJwtAuth.decorator';
import { User } from 'src/_common/decorators/User.decorator';
import { LocalAuthGuard } from 'src/_common/guards/LocalAuth.guard';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './dto/AuthToken.dto';
import { LoginFormDto } from './dto/LoginForm.dto';
import { RegistrationFormDto } from './dto/RegistrationForm.dto';

@Controller('auth')
@ApiTags('Auth API')
@SkipJwtAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registrationFormDto: RegistrationFormDto) {
    return this.authService.registerUser(registrationFormDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginFormDto })
  async login(@User() user: UserDto) {
    const authToken = await this.authService.generateAccessToken(user);
    return new AuthTokenDto(authToken);
  }
}
