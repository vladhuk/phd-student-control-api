import { NotFoundException } from '@nestjs/common';

export class TaskNotFoundOnUserException extends NotFoundException {
  constructor(taskId: number) {
    super(`Task ${taskId} does not exist on user individual plan`);
  }
}
