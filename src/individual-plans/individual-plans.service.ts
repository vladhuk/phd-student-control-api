import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ATTACHMENTS_DIR_PATH } from 'src/_common/constans';
import { Attachment } from './entities/attachment.entity';
import { IndividualPlanTask } from './entities/individual-plan-task.entity';
import { IndividualPlan } from './entities/individual-plan.entity';

@Injectable()
export class IndividualPlansService {
  constructor(
    @InjectRepository(IndividualPlan)
    private readonly individualPlanRepository: Repository<IndividualPlan>,
    @InjectRepository(IndividualPlanTask)
    private readonly individualPlanTaskRepository: Repository<IndividualPlanTask>,
    @InjectRepository(IndividualPlan)
    private readonly attachmentRepository: Repository<Attachment>
  ) {}

  async taskExistsOnPlan(planId: number, taskId: number): Promise<boolean> {
    const plan = await this.individualPlanRepository.findOne(planId);
    const tasks = await plan.tasks;

    return tasks.map((task) => task.id).some((id) => id === taskId);
  }

  async addAttachmentToTask(
    taskId: number,
    fileName: string,
    fileBuffer: Buffer
  ): Promise<void> {
    const task = await this.individualPlanTaskRepository.findOne(taskId);

    await this.deleteAttachmentIfExists(task);

    const attachment = new Attachment();
    attachment.fileName = fileName;
    const savedAttachment = await this.attachmentRepository.save(attachment);

    task.attachment = savedAttachment;
    await this.individualPlanTaskRepository.save(task);

    if (!(await this.fileExists(ATTACHMENTS_DIR_PATH))) {
      await fs.mkdir(ATTACHMENTS_DIR_PATH);
    }

    const filePath = this.getAttachmentPathByAttachmentId(attachment.id);
    await fs.writeFile(filePath, fileBuffer);
  }

  private async deleteAttachmentIfExists(
    task: IndividualPlanTask
  ): Promise<void> {
    const attachment = await task.attachment;

    if (!attachment) {
      return;
    }

    await fs.unlink(this.getAttachmentPathByAttachmentId(attachment.id));
    await this.attachmentRepository.remove(attachment);
  }

  private getAttachmentPathByAttachmentId(attachmentId: number): string {
    return `${ATTACHMENTS_DIR_PATH}/${attachmentId}`;
  }

  private async fileExists(path: string): Promise<boolean> {
    return fs
      .stat(path)
      .then(() => true)
      .catch(() => false);
  }

  async getAttachmentPathByTaskId(taskId: number): Promise<string> {
    const task = await this.individualPlanTaskRepository.findOne(taskId);
    const attachment = await task.attachment;

    return this.getAttachmentPathByAttachmentId(attachment.id);
  }
}
