/**
 * SavedView entity - corresponds to documents.models.SavedView
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../paperless/models/User';

@Entity('documents_savedview')
export class SavedView {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 128 })
  name!: string;

  @Column({ type: 'boolean', name: 'show_on_dashboard', default: false })
  showOnDashboard!: boolean;

  @Column({ type: 'boolean', name: 'show_in_sidebar', default: false })
  showInSidebar!: boolean;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'sort_field' })
  sortField?: string;

  @Column({ type: 'boolean', name: 'sort_reverse', default: false })
  sortReverse!: boolean;

  @Column({ type: 'jsonb', name: 'filter_rules', default: [] })
  filterRules!: Array<Record<string, unknown>>;

  @Column({ type: 'int', name: 'page_size', nullable: true })
  pageSize?: number;

  @Column({ type: 'jsonb', name: 'display_fields', nullable: true })
  displayFields?: string[];

  @Column({ type: 'varchar', length: 32, name: 'display_mode', nullable: true })
  displayMode?: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner!: User;

  @Column({ type: 'int', name: 'owner_id' })
  ownerId!: number;
}

export default SavedView;
