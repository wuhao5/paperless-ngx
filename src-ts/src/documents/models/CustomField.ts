/**
 * CustomField entity - corresponds to documents.models.CustomField
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export enum CustomFieldDataType {
  STRING = 'string',
  URL = 'url',
  DATE = 'date',
  BOOLEAN = 'boolean',
  INTEGER = 'integer',
  FLOAT = 'float',
  MONETARY = 'monetary',
  DOCUMENT_LINK = 'documentlink',
  SELECT = 'select',
}

@Entity('documents_customfield')
export class CustomField {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 128, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 50, name: 'data_type' })
  dataType!: CustomFieldDataType;

  @Column({ type: 'jsonb', name: 'extra_data', nullable: true })
  extraData?: Record<string, unknown>;
}

export default CustomField;
