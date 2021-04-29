import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/_common/enums/role';
import { PhdStudentsService } from 'src/phd-students/phd-students.service';
import { ScientificDirectorsService } from 'src/scientific-directors/scientific-directors.service';
import { UserDto } from 'src/users/dto/user.dto';
import { ROLE_KEY } from '../decorators/for-role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly phdStudentsService: PhdStudentsService,
    private readonly scientificDirectorService: ScientificDirectorsService
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || !roles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: UserDto = request.user;
    const role = roles[0];

    switch (role) {
      case Role.PHD_STUDENT:
        return !!(await this.phdStudentsService.findOneByUserId(user.id));
      case Role.SCIENTIFIC_DIRECTOR:
        return !!(await this.scientificDirectorService.findOneByUserId(
          user.id
        ));
      default:
        return false;
    }
  }
}
