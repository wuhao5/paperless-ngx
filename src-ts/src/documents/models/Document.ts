/**
 * Document entity - corresponds to documents.models.Document
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import path from 'path';
import { User } from '../../paperless/models/User';
import { Correspondent } from './Correspondent';
import { DocumentType } from './DocumentType';
import { Tag } from './Tag';
import { StoragePath } from './StoragePath';
import { config } from '../../paperless/config/settings';

export const ARCHIVE_SERIAL_NUMBER_MIN = 0;
export const ARCHIVE_SERIAL_NUMBER_MAX = 0xFFFFFFFF;

@Entity('documents_document')
export class Document {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 128, default: '' })
  @Index()
  title!: string;

  @Column({ type: 'text', default: '' })
  content!: string;

  @Column({ type: 'varchar', length: 256, name: 'mime_type' })
  mimeType!: string;

  @Column({ type: 'varchar', length: 32 })
  checksum!: string;

  @Column({ type: 'varchar', length: 32, nullable: true, name: 'archive_checksum' })
  archiveChecksum?: string;

  @Column({ type: 'int', nullable: true, name: 'page_count' })
  pageCount?: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  @Index()
  created!: Date;

  @UpdateDateColumn({ name: 'modified' })
  @Index()
  modified!: Date;

  @CreateDateColumn({ name: 'added' })
  @Index()
  added!: Date;

  @Column({ type: 'varchar', length: 1024, nullable: true, unique: true })
  filename?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true, unique: true, name: 'archive_filename' })
  archiveFilename?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true, name: 'original_filename' })
  originalFilename?: string;

  @Column({
    type: 'int',
    nullable: true,
    unique: true,
    name: 'archive_serial_number',
  })
  @Index()
  archiveSerialNumber?: number;

  // Soft delete support
  @Column({ type: 'timestamp', nullable: true, name: 'deleted_at' })
  deletedAt?: Date;

  @Column({ type: 'boolean', default: false, name: 'is_deleted' })
  isDeleted!: boolean;

  // Relationships
  @ManyToOne(() => Correspondent, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'correspondent_id' })
  correspondent?: Correspondent;

  @Column({ type: 'int', nullable: true, name: 'correspondent_id' })
  correspondentId?: number;

  @ManyToOne(() => DocumentType, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'document_type_id' })
  documentType?: DocumentType;

  @Column({ type: 'int', nullable: true, name: 'document_type_id' })
  documentTypeId?: number;

  @ManyToOne(() => StoragePath, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'storage_path_id' })
  storagePath?: StoragePath;

  @Column({ type: 'int', nullable: true, name: 'storage_path_id' })
  storagePathId?: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'owner_id' })
  owner?: User;

  @Column({ type: 'int', nullable: true, name: 'owner_id' })
  ownerId?: number;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'documents_document_tags',
    joinColumn: { name: 'document_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags!: Tag[];

  /**
   * Get the default file extension for the mime type
   */
  getFileType(): string {
    const mimeToExt: Record<string, string> = {
      'application/pdf': '.pdf',
      'image/png': '.png',
      'image/jpeg': '.jpg',
      'image/tiff': '.tiff',
      'image/gif': '.gif',
      'text/plain': '.txt',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
      'application/msword': '.doc',
    };
    return mimeToExt[this.mimeType] || '';
  }

  /**
   * Get the source path for the original document
   */
  get sourcePath(): string {
    const fname = this.filename || `${this.id.toString().padStart(7, '0')}${this.getFileType()}`;
    return path.resolve(config.originalsDir, fname);
  }

  /**
   * Check if document has an archive version
   */
  get hasArchiveVersion(): boolean {
    return this.archiveFilename !== null && this.archiveFilename !== undefined;
  }

  /**
   * Get the archive path
   */
  get archivePath(): string | null {
    if (this.hasArchiveVersion && this.archiveFilename) {
      return path.resolve(config.archiveDir, this.archiveFilename);
    }
    return null;
  }

  /**
   * Get thumbnail path
   */
  get thumbnailPath(): string {
    const webpFileName = `${this.id.toString().padStart(7, '0')}.webp`;
    return path.resolve(config.thumbnailDir, webpFileName);
  }

  /**
   * Get suggestion content (cropped for large documents)
   */
  get suggestionContent(): string {
    if (!this.content || this.content.length <= 1200000) {
      return this.content;
    }
    // Use 80% from the start and 20% from the end
    const headLen = 800000;
    const tailLen = 200000;
    return `${this.content.slice(0, headLen)} ${this.content.slice(-tailLen)}`;
  }

  /**
   * Get public filename for download
   */
  getPublicFilename(options: { archive?: boolean; counter?: number; suffix?: string } = {}): string {
    const { archive = false, counter = 0, suffix } = options;
    let result = this.toString();

    if (counter) {
      result += `_${counter.toString().padStart(2, '0')}`;
    }

    if (suffix) {
      result += suffix;
    }

    if (archive) {
      result += '.pdf';
    } else {
      result += this.getFileType();
    }

    // Basic filename sanitization
    return result.replace(/[<>:"/\\|?*]/g, '-');
  }

  toString(): string {
    const createdStr = this.created.toISOString().split('T')[0];
    let res = createdStr;
    if (this.correspondent) {
      res += ` ${this.correspondent.name}`;
    }
    if (this.title) {
      res += ` ${this.title}`;
    }
    return res;
  }
}

export default Document;
