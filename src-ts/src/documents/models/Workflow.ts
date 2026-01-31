/**
 * Workflow entity - corresponds to documents.models.Workflow
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../paperless/models/User';
import { WorkflowTrigger } from './WorkflowTrigger';
import { WorkflowAction } from './WorkflowAction';

@Entity('documents_workflow')
export class Workflow {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 256 })
  name!: string;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @Column({ type: 'boolean', default: true })
  enabled!: boolean;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  owner?: User;

  @Column({ type: 'int', nullable: true, name: 'owner_id' })
  ownerId?: number;

  @OneToMany(() => WorkflowTrigger, (trigger) => trigger.workflow)
  triggers!: WorkflowTrigger[];

  @OneToMany(() => WorkflowAction, (action) => action.workflow)
  actions!: WorkflowAction[];
}

export default Workflow;
