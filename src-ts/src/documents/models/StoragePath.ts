/**
 * StoragePath entity - corresponds to documents.models.StoragePath
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

@Entity('documents_storagepath')
@Unique(['name', 'owner'])
export class StoragePath {
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

  @Column({ type: 'text' })
  path!: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  owner?: User;

  @Column({ type: 'int', nullable: true, name: 'owner_id' })
  ownerId?: number;
}

export default StoragePath;
