/**
 * ProcessedMail entity - corresponds to paperless_mail.models.ProcessedMail
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { MailRule } from './MailRule';
import { MailAccount } from './MailAccount';

export enum ProcessedMailStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  SKIPPED = 'skipped',
}

@Entity('paperless_mail_processedmail')
export class ProcessedMail {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => MailRule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rule_id' })
  rule!: MailRule;

  @Column({ type: 'int', name: 'rule_id' })
  ruleId!: number;

  @ManyToOne(() => MailAccount, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account!: MailAccount;

  @Column({ type: 'int', name: 'account_id' })
  accountId!: number;

  @Column({ type: 'varchar', length: 256 })
  folder!: string;

  @Column({ type: 'varchar', length: 512, name: 'uid' })
  uid!: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  subject?: string;

  @Column({ type: 'timestamp', nullable: true, name: 'received' })
  received?: Date;

  @CreateDateColumn({ name: 'processed' })
  processed!: Date;

  @Column({ type: 'varchar', length: 32, default: ProcessedMailStatus.SUCCESS })
  status!: ProcessedMailStatus;

  @Column({ type: 'text', nullable: true })
  error?: string;
}

export default ProcessedMail;
