/**
 * Data models/DTOs for Paperless-ngx
 * Corresponds to documents/data_models.py
 */

/**
 * Document source enum
 */
export enum DocumentSource {
  ConsumeFolder = 1,
  ApiUpload = 2,
  MailFetch = 3,
  WebUI = 4,
}

/**
 * Metadata overrides for document fields
 */
export interface DocumentMetadataOverrides {
  filename?: string;
  title?: string;
  correspondentId?: number;
  documentTypeId?: number;
  tagIds?: number[];
  storagePathId?: number;
  created?: Date;
  asn?: number;
  ownerId?: number;
  viewUsers?: number[];
  viewGroups?: number[];
  changeUsers?: number[];
  changeGroups?: number[];
  customFields?: Record<string, unknown>;
  skipAsn?: boolean;
}

/**
 * Merge two DocumentMetadataOverrides
 */
export function mergeOverrides(
  base: DocumentMetadataOverrides,
  other: DocumentMetadataOverrides
): DocumentMetadataOverrides {
  const merged = { ...base };

  // Single value overrides
  if (other.title !== undefined) merged.title = other.title;
  if (other.correspondentId !== undefined) merged.correspondentId = other.correspondentId;
  if (other.documentTypeId !== undefined) merged.documentTypeId = other.documentTypeId;
  if (other.storagePathId !== undefined) merged.storagePathId = other.storagePathId;
  if (other.ownerId !== undefined) merged.ownerId = other.ownerId;
  if (other.skipAsn) merged.skipAsn = true;

  // Merge arrays (tags, permissions)
  if (other.tagIds !== undefined) {
    merged.tagIds = [...new Set([...(merged.tagIds || []), ...other.tagIds])];
  }
  if (other.viewUsers !== undefined) {
    merged.viewUsers = [...new Set([...(merged.viewUsers || []), ...other.viewUsers])];
  }
  if (other.viewGroups !== undefined) {
    merged.viewGroups = [...new Set([...(merged.viewGroups || []), ...other.viewGroups])];
  }
  if (other.changeUsers !== undefined) {
    merged.changeUsers = [...new Set([...(merged.changeUsers || []), ...other.changeUsers])];
  }
  if (other.changeGroups !== undefined) {
    merged.changeGroups = [...new Set([...(merged.changeGroups || []), ...other.changeGroups])];
  }

  // Merge custom fields
  if (other.customFields !== undefined) {
    merged.customFields = { ...(merged.customFields || {}), ...other.customFields };
  }

  return merged;
}

/**
 * Consumable document data
 */
export interface ConsumableDocument {
  source: DocumentSource;
  originalFile: string;
  originalPath?: string;
  mailruleId?: number;
  mimeType?: string;
}

/**
 * Email attachment data
 */
export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

/**
 * Bulk edit operation types
 */
export enum BulkEditOperation {
  SET_CORRESPONDENT = 'set_correspondent',
  SET_DOCUMENT_TYPE = 'set_document_type',
  SET_STORAGE_PATH = 'set_storage_path',
  ADD_TAG = 'add_tag',
  REMOVE_TAG = 'remove_tag',
  SET_PERMISSIONS = 'set_permissions',
  DELETE = 'delete',
  REDO_OCR = 'redo_ocr',
  ROTATE = 'rotate',
  MERGE = 'merge',
  SPLIT = 'split',
}

/**
 * Bulk download options
 */
export interface BulkDownloadOptions {
  documents: number[];
  content: 'archive' | 'originals' | 'both';
  compression: 'none' | 'zip' | 'tar.gz';
  followFormatting: boolean;
}

export default {
  DocumentSource,
  BulkEditOperation,
  mergeOverrides,
};
