import { NotFoundException } from '@nestjs/common';

export class DirectorDoesNotHaveStudentWithTask extends NotFoundException {
  constructor(studentId: number, taskId: number) {
    super(
      `Director doesn't have user with studentId=${studentId} with taskId=${taskId}`
    );
  }
}
