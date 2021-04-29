import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DateAudit {
  @Column({ name: 'created_at' })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ name: 'updated_at' })
  @UpdateDateColumn()
  updatedAt: Date;
}
