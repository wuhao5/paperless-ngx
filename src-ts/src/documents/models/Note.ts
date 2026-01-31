/**
 * Note entity - corresponds to documents.models.Note
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

@Entity('documents_note')
export class Note {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  note!: string;

  @CreateDateColumn()
  created!: Date;

  @ManyToOne(() => Document, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'document_id' })
  document!: Document;

  @Column({ type: 'int', name: 'document_id' })
  documentId!: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ type: 'int', nullable: true, name: 'user_id' })
  userId?: number;
}

export default Note;
