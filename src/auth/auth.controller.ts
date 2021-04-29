import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { SkipJwtAuth } from 'src/_common/decorators/skip-jwt-auth.decorator';
import { User } from 'src/_common/decorators/user.decorator';
import { LocalAuthGuard } from 'src/_common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './dto/auth-token.dto';
import { LoginFormDto } from './dto/login-form.dto';
import { RegistrationFormDto } from './dto/registration-form.dto';

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
