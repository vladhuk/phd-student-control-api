import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IndividualPlansService } from 'src/individual-plans/individual-plans.service';
import { TaskNotFoundOnUserException } from 'src/phd-students/exceptions/task-not-found-on-user.exceptions';
import { PhdStudentsService } from 'src/phd-students/phd-students.service';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class CheckTaskOnUserGuard implements CanActivate {
  constructor(
    private readonly phdStudentsService: PhdStudentsService,
    private readonly individualPlansService: IndividualPlansService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user: UserDto = req.user;
    // It is not converted to number, because ValidationPipe executed after guard
    const taskId = +req.taskId;

    const phdStudent = await this.phdStudentsService.findOneByUserId(user.id);
    const plan = phdStudent.individualPlan;

    if (await this.individualPlansService.taskExistsOnPlan(plan.id, taskId)) {
      return true;
    }

    throw new TaskNotFoundOnUserException(taskId);
  }
}
