/**
 * UiSettings entity - corresponds to documents.models.UiSettings
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../paperless/models/User';

@Entity('documents_uisettings')
export class UiSettings {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'int', name: 'user_id' })
  userId!: number;

  @Column({ type: 'jsonb', default: {} })
  settings!: Record<string, unknown>;
}

export default UiSettings;
