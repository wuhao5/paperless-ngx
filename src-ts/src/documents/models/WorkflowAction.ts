/**
 * WorkflowAction entity - corresponds to documents.models.WorkflowAction
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
import { Workflow } from './Workflow';
import { Correspondent } from './Correspondent';
import { DocumentType } from './DocumentType';
import { Tag } from './Tag';
import { StoragePath } from './StoragePath';
import { User } from '../../paperless/models/User';
import { Group } from '../../paperless/models/Group';
import { CustomField } from './CustomField';

export enum WorkflowActionType {
  ASSIGNMENT = 1,
  REMOVAL = 2,
  EMAIL = 3,
  WEBHOOK = 4,
}

@Entity('documents_workflowaction')
export class WorkflowAction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  type!: WorkflowActionType;

  @ManyToOne(() => Workflow, (workflow) => workflow.actions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workflow_id' })
  workflow!: Workflow;

  @Column({ type: 'int', name: 'workflow_id' })
  workflowId!: number;

  // Assignment fields
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

  @Column({ type: 'jsonb', nullable: true, name: 'assign_custom_fields' })
  assignCustomFields?: Record<string, unknown>;

  // Many to many relationships for assignments
  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'documents_workflowaction_assign_tags',
    joinColumn: { name: 'workflowaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  assignTags!: Tag[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'documents_workflowaction_assign_view_users',
    joinColumn: { name: 'workflowaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  assignViewUsers!: User[];

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'documents_workflowaction_assign_view_groups',
    joinColumn: { name: 'workflowaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
  })
  assignViewGroups!: Group[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'documents_workflowaction_assign_change_users',
    joinColumn: { name: 'workflowaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  assignChangeUsers!: User[];

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'documents_workflowaction_assign_change_groups',
    joinColumn: { name: 'workflowaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
  })
  assignChangeGroups!: Group[];

  // Removal fields
  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'documents_workflowaction_remove_tags',
    joinColumn: { name: 'workflowaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  removeTags!: Tag[];

  @Column({ type: 'boolean', name: 'remove_all_tags', default: false })
  removeAllTags!: boolean;

  @Column({ type: 'boolean', name: 'remove_correspondent', default: false })
  removeCorrespondent!: boolean;

  @Column({ type: 'boolean', name: 'remove_document_type', default: false })
  removeDocumentType!: boolean;

  @Column({ type: 'boolean', name: 'remove_storage_path', default: false })
  removeStoragePath!: boolean;

  @Column({ type: 'boolean', name: 'remove_owner', default: false })
  removeOwner!: boolean;

  @ManyToMany(() => CustomField)
  @JoinTable({
    name: 'documents_workflowaction_remove_custom_fields',
    joinColumn: { name: 'workflowaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'customfield_id', referencedColumnName: 'id' },
  })
  removeCustomFields!: CustomField[];

  @Column({ type: 'boolean', name: 'remove_all_custom_fields', default: false })
  removeAllCustomFields!: boolean;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'documents_workflowaction_remove_view_users',
    joinColumn: { name: 'workflowaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  removeViewUsers!: User[];

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'documents_workflowaction_remove_view_groups',
    joinColumn: { name: 'workflowaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
  })
  removeViewGroups!: Group[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'documents_workflowaction_remove_change_users',
    joinColumn: { name: 'workflowaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  removeChangeUsers!: User[];

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'documents_workflowaction_remove_change_groups',
    joinColumn: { name: 'workflowaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
  })
  removeChangeGroups!: Group[];

  @Column({ type: 'boolean', name: 'remove_all_permissions', default: false })
  removeAllPermissions!: boolean;
}

export default WorkflowAction;
