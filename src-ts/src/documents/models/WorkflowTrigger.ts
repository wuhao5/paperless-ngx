/**
 * WorkflowTrigger entity - corresponds to documents.models.WorkflowTrigger
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
import { MatchingAlgorithm } from './Correspondent';
import { Workflow } from './Workflow';
import { Correspondent } from './Correspondent';
import { DocumentType } from './DocumentType';
import { Tag } from './Tag';
import { StoragePath } from './StoragePath';
import { MailRule } from '../../paperless_mail/models/MailRule';

export enum WorkflowTriggerType {
  CONSUMPTION = 1,
  DOCUMENT_ADDED = 2,
  DOCUMENT_UPDATED = 3,
  SCHEDULED = 4,
}

export enum WorkflowTriggerSource {
  CONSUME_FOLDER = 1,
  API_UPLOAD = 2,
  MAIL_FETCH = 3,
}

@Entity('documents_workflowtrigger')
export class WorkflowTrigger {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  type!: WorkflowTriggerType;

  @Column({ type: 'jsonb', nullable: true })
  sources?: WorkflowTriggerSource[];

  @Column({ type: 'varchar', length: 256, name: 'filter_filename', nullable: true })
  filterFilename?: string;

  @Column({ type: 'varchar', length: 256, name: 'filter_path', nullable: true })
  filterPath?: string;

  @Column({
    type: 'int',
    name: 'matching_algorithm',
    default: MatchingAlgorithm.NONE,
  })
  matchingAlgorithm!: MatchingAlgorithm;

  @Column({ type: 'varchar', length: 256, default: '' })
  match!: string;

  @Column({ type: 'boolean', name: 'is_insensitive', default: true })
  isInsensitive!: boolean;

  @Column({ type: 'boolean', name: 'filter_has_tags', nullable: true })
  filterHasTags?: boolean;

  @Column({ type: 'boolean', name: 'filter_has_correspondent', nullable: true })
  filterHasCorrespondent?: boolean;

  @Column({ type: 'boolean', name: 'filter_has_document_type', nullable: true })
  filterHasDocumentType?: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'schedule' })
  schedule?: string;

  @ManyToOne(() => Workflow, (workflow) => workflow.triggers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workflow_id' })
  workflow!: Workflow;

  @Column({ type: 'int', name: 'workflow_id' })
  workflowId!: number;

  @ManyToMany(() => Correspondent)
  @JoinTable({
    name: 'documents_workflowtrigger_filter_correspondent',
    joinColumn: { name: 'workflowtrigger_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'correspondent_id', referencedColumnName: 'id' },
  })
  filterCorrespondent!: Correspondent[];

  @ManyToMany(() => DocumentType)
  @JoinTable({
    name: 'documents_workflowtrigger_filter_document_type',
    joinColumn: { name: 'workflowtrigger_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'documenttype_id', referencedColumnName: 'id' },
  })
  filterDocumentType!: DocumentType[];

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'documents_workflowtrigger_filter_has_tags',
    joinColumn: { name: 'workflowtrigger_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  filterTags!: Tag[];

  @ManyToMany(() => StoragePath)
  @JoinTable({
    name: 'documents_workflowtrigger_filter_storage_path',
    joinColumn: { name: 'workflowtrigger_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'storagepath_id', referencedColumnName: 'id' },
  })
  filterStoragePath!: StoragePath[];

  @ManyToMany(() => MailRule)
  @JoinTable({
    name: 'documents_workflowtrigger_filter_mailrule',
    joinColumn: { name: 'workflowtrigger_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'mailrule_id', referencedColumnName: 'id' },
  })
  filterMailRule!: MailRule[];
}

export default WorkflowTrigger;
