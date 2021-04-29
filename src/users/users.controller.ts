import { Controller, Get } from '@nestjs/common';
import { User } from 'src/_common/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@User() user: UserDto): UserDto {
    return user;
  }
}
