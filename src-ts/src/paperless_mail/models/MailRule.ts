/**
 * MailRule entity - corresponds to paperless_mail.models.MailRule
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { User } from '../../paperless/models/User';
import { MailAccount } from './MailAccount';
import { Correspondent } from '../../documents/models/Correspondent';
import { DocumentType } from '../../documents/models/DocumentType';
import { Tag } from '../../documents/models/Tag';
import { StoragePath } from '../../documents/models/StoragePath';

export enum MailAction {
  DELETE = 1,
  MOVE = 2,
  MARK_READ = 3,
  FLAG = 4,
  TAG = 5,
}

export enum MailActionParameter {
  NONE = 0,
  FOLDER = 1,
  TAG = 2,
}

export enum AttachmentType {
  ATTACHMENTS_ONLY = 1,
  EVERYTHING = 2,
}

export enum TitleFromOption {
  FILENAME = 0,
  SUBJECT = 1,
  NONE = 2,
}

export enum CorrespondentFromOption {
  NOTHING = 0,
  FROM_EMAIL = 1,
  FROM_NAME = 2,
  FROM_CUSTOM = 3,
}

export enum MailFilterAttachmentType {
  EVERYTHING = 0,
  ATTACHMENTS_ONLY = 1,
}

export enum ConsumptionScope {
  ATTACHMENTS_ONLY = 0,
  EMAIL_ONLY = 1,
  BOTH = 2,
}

@Entity('paperless_mail_mailrule')
export class MailRule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 256 })
  name!: string;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @ManyToOne(() => MailAccount, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account!: MailAccount;

  @Column({ type: 'int', name: 'account_id' })
  accountId!: number;

  @Column({ type: 'varchar', length: 256, default: 'INBOX' })
  folder!: string;

  @Column({ type: 'varchar', length: 256, nullable: true, name: 'filter_from' })
  filterFrom?: string;

  @Column({ type: 'varchar', length: 256, nullable: true, name: 'filter_to' })
  filterTo?: string;

  @Column({ type: 'varchar', length: 256, nullable: true, name: 'filter_subject' })
  filterSubject?: string;

  @Column({ type: 'varchar', length: 256, nullable: true, name: 'filter_body' })
  filterBody?: string;

  @Column({ type: 'int', nullable: true, name: 'filter_age_days' })
  filterAgeDays?: number;

  @Column({ type: 'int', name: 'filter_attachment_type', default: MailFilterAttachmentType.EVERYTHING })
  filterAttachmentType!: MailFilterAttachmentType;

  @Column({ type: 'varchar', length: 256, nullable: true, name: 'filter_attachment_filename_include' })
  filterAttachmentFilenameInclude?: string;

  @Column({ type: 'varchar', length: 256, nullable: true, name: 'filter_attachment_filename_exclude' })
  filterAttachmentFilenameExclude?: string;

  @Column({ type: 'int', name: 'maximum_age_days', nullable: true })
  maximumAgeDays?: number;

  @Column({ type: 'int', name: 'action', default: MailAction.MARK_READ })
  action!: MailAction;

  @Column({ type: 'varchar', length: 256, nullable: true, name: 'action_parameter' })
  actionParameter?: string;

  @Column({ type: 'int', name: 'consumption_scope', default: ConsumptionScope.ATTACHMENTS_ONLY })
  consumptionScope!: ConsumptionScope;

  @Column({ type: 'int', name: 'title_from', default: TitleFromOption.FILENAME })
  titleFrom!: TitleFromOption;

  @Column({ type: 'int', name: 'correspondent_from', default: CorrespondentFromOption.NOTHING })
  correspondentFrom!: CorrespondentFromOption;

  @ManyToOne(() => Correspondent, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assign_correspondent_id' })
  assignCorrespondent?: Correspondent;

  @Column({ type: 'int', nullable: true, name: 'assign_correspondent_id' })
  assignCorrespondentId?: number;

  @ManyToOne(() => DocumentType, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assign_document_type_id' })
  assignDocumentType?: DocumentType;

  @Column({ type: 'int', nullable: true, name: 'assign_document_type_id' })
  assignDocumentTypeId?: number;

  @ManyToOne(() => StoragePath, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assign_storage_path_id' })
  assignStoragePath?: StoragePath;

  @Column({ type: 'int', nullable: true, name: 'assign_storage_path_id' })
  assignStoragePathId?: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assign_owner_id' })
  assignOwner?: User;

  @Column({ type: 'int', nullable: true, name: 'assign_owner_id' })
  assignOwnerId?: number;

  @Column({ type: 'varchar', length: 256, nullable: true, name: 'assign_title' })
  assignTitle?: string;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'paperless_mail_mailrule_assign_tags',
    joinColumn: { name: 'mailrule_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  assignTags!: Tag[];

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  owner?: User;

  @Column({ type: 'int', nullable: true, name: 'owner_id' })
  ownerId?: number;
}

export default MailRule;
