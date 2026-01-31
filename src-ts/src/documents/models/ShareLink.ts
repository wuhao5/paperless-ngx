/**
 * ShareLink entity - corresponds to documents.models.ShareLink
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
import { Document } from './Document';

export enum ShareLinkFileVersion {
  ARCHIVE = 'archive',
  ORIGINAL = 'original',
}

@Entity('documents_sharelink')
export class ShareLink {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  slug!: string;

  @Column({ type: 'timestamp', nullable: true })
  expiration?: Date;

  @Column({ type: 'varchar', length: 16, name: 'file_version', default: ShareLinkFileVersion.ARCHIVE })
  fileVersion!: ShareLinkFileVersion;

  @CreateDateColumn()
  created!: Date;

  @ManyToOne(() => Document, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'document_id' })
  document!: Document;

  @Column({ type: 'int', name: 'document_id' })
  documentId!: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  owner?: User;

  @Column({ type: 'int', nullable: true, name: 'owner_id' })
  ownerId?: number;
}

export default ShareLink;
