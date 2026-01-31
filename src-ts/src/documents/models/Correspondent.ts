/**
 * Correspondent entity - corresponds to documents.models.Correspondent
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../paperless/models/User';

export enum MatchingAlgorithm {
  NONE = 0,
  ANY = 1,
  ALL = 2,
  LITERAL = 3,
  REGEX = 4,
  FUZZY = 5,
  AUTO = 6,
}

/**
 * Base class for matching models (Correspondent, DocumentType, Tag, StoragePath)
 * Cannot use class inheritance with TypeORM in the same way as Django abstract models
 * So we define common columns in each entity
 */

@Entity('documents_correspondent')
@Unique(['name', 'owner'])
export class Correspondent {
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

export default Correspondent;
