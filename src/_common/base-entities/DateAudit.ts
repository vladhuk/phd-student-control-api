import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DateAudit {
  @CreateDateColumn()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
