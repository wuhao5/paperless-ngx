/**
 * Tag entity - corresponds to documents.models.Tag
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { User } from '../../paperless/models/User';
import { MatchingAlgorithm } from './Correspondent';

@Entity('documents_tag')
@Tree('closure-table')
@Unique(['name', 'owner'])
export class Tag {
  static readonly MAX_NESTING_DEPTH = 5;

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 128 })
  name!: string;

  @Column({ type: 'varchar', length: 256, default: '' })
  match!: string;

  @Column({
    type: 'int',
    name: 'matching_algorithm',
    default: MatchingAlgorithm.ANY,
  })
  matchingAlgorithm!: MatchingAlgorithm;

  @Column({ type: 'boolean', name: 'is_insensitive', default: true })
  isInsensitive!: boolean;

  @Column({ type: 'varchar', length: 7, default: '#a6cee3' })
  color!: string;

  @Column({ type: 'boolean', name: 'is_inbox_tag', default: false })
  isInboxTag!: boolean;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  owner?: User;

  @Column({ type: 'int', nullable: true, name: 'owner_id' })
  ownerId?: number;

  @TreeChildren()
  children!: Tag[];

  @TreeParent()
  parent?: Tag;
}

export default Tag;
