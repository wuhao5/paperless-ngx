/**
 * ShareLinkBundle entity - corresponds to documents.models.ShareLinkBundle
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../paperless/models/User';
import { ShareLinkFileVersion } from './ShareLink';

@Entity('documents_sharelinkbundle')
export class ShareLinkBundle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  slug!: string;

  @Column({ type: 'timestamp', nullable: true })
  expiration?: Date;

  @Column({ type: 'varchar', length: 16, name: 'file_version', default: ShareLinkFileVersion.ARCHIVE })
  fileVersion!: ShareLinkFileVersion;

  @Column({ type: 'jsonb', name: 'document_ids', default: [] })
  documentIds!: number[];

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'zip_file' })
  zipFile?: string;

  @CreateDateColumn()
  created!: Date;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  owner?: User;

  @Column({ type: 'int', nullable: true, name: 'owner_id' })
  ownerId?: number;
}

export default ShareLinkBundle;
