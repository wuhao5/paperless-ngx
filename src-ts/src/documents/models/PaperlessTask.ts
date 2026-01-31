/**
 * PaperlessTask entity - corresponds to documents.models.PaperlessTask
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum TaskStatus {
  PENDING = 'PENDING',
  STARTED = 'STARTED',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  REVOKED = 'REVOKED',
}

export enum TaskType {
  FILE = 'file',
  CONSUME = 'consume',
  INDEX = 'index',
  OTHER = 'other',
}

@Entity('documents_paperlesstask')
export class PaperlessTask {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true, name: 'task_id' })
  @Index()
  taskId!: string;

  @Column({ type: 'varchar', length: 255, name: 'task_file_name', nullable: true })
  taskFileName?: string;

  @Column({ type: 'varchar', length: 255, name: 'task_name', nullable: true })
  taskName?: string;

  @CreateDateColumn({ name: 'date_created' })
  dateCreated!: Date;

  @UpdateDateColumn({ name: 'date_done', nullable: true })
  dateDone?: Date;

  @Column({ type: 'varchar', length: 50, default: TaskStatus.PENDING })
  status!: TaskStatus;

  @Column({ type: 'text', nullable: true })
  result?: string;

  @Column({ type: 'boolean', default: false })
  acknowledged!: boolean;

  @Column({ type: 'int', nullable: true, name: 'related_document_id' })
  relatedDocumentId?: number;
}

export default PaperlessTask;
