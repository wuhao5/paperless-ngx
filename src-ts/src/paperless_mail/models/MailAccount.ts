/**
 * MailAccount entity - corresponds to paperless_mail.models.MailAccount
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../paperless/models/User';

export enum MailAccountType {
  IMAP = 'imap',
  POP3 = 'pop3',
  GMAIL_API = 'gmail_api',
  OUTLOOK_API = 'outlook_api',
}

@Entity('paperless_mail_mailaccount')
export class MailAccount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 256 })
  name!: string;

  @Column({ type: 'varchar', length: 256, name: 'imap_server', nullable: true })
  imapServer?: string;

  @Column({ type: 'int', name: 'imap_port', nullable: true })
  imapPort?: number;

  @Column({ type: 'varchar', length: 8, name: 'imap_security', default: 'ssl' })
  imapSecurity!: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  username?: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  password?: string;

  @Column({ type: 'varchar', length: 16, name: 'account_type', default: MailAccountType.IMAP })
  accountType!: MailAccountType;

  @Column({ type: 'boolean', name: 'is_token', default: false })
  isToken!: boolean;

  @Column({ type: 'text', nullable: true, name: 'expiration' })
  expiration?: string;

  @Column({ type: 'varchar', length: 64, nullable: true, name: 'character_set' })
  characterSet?: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  owner?: User;

  @Column({ type: 'int', nullable: true, name: 'owner_id' })
  ownerId?: number;
}

export default MailAccount;
