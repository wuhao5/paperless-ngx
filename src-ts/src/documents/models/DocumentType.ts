/**
 * DocumentType entity - corresponds to documents.models.DocumentType
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../paperless/models/User';
import { MatchingAlgorithm } from './Correspondent';

@Entity('documents_documenttype')
@Unique(['name', 'owner'])
export class DocumentType {
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

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  owner?: User;

  @Column({ type: 'int', nullable: true, name: 'owner_id' })
  ownerId?: number;
}

export default DocumentType;
