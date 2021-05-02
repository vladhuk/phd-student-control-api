import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/_common/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users/me')
@ApiTags('Users API')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getProfile(@User() user: UserDto): UserDto {
    return user;
  }
}
