import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IndividualPlansService } from 'src/individual-plans/individual-plans.service';
import { TaskNotFoundOnUserException } from 'src/phd-students/exceptions/task-not-found-on-user.exceptions';
import { PhdStudentsService } from 'src/phd-students/phd-students.service';
import { UserDto } from 'src/users/dto/user.dto';
import { ScientificDirectorsService } from '../scientific-directors.service';

@Injectable()
export class DirectorHasStudentWithTask implements CanActivate {
  constructor(
    private readonly scientificDirectorsService: ScientificDirectorsService,
    private readonly phdStudentService: PhdStudentsService,
    private readonly individualPlansService: IndividualPlansService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user: UserDto = req.user;
    const { studentId, taskId } = req.params;

    const director = await this.scientificDirectorsService.findOneByUserId(
      user.id
    );
    const student = await this.phdStudentService.findOneByStudentIdAndScientificDirectorId(
      +studentId,
      director.id
    );
    const plan = await student.individualPlan;

    if (this.individualPlansService.taskExistsOnPlan(plan.id, taskId)) {
      return true;
    }

    throw new TaskNotFoundOnUserException(taskId);
  }
}
