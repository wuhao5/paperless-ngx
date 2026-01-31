/**
 * Document Controller
 * Corresponds to documents/views.py UnifiedSearchViewSet
 */

import { Context } from 'koa';
import fs from 'fs';
import path from 'path';
import { Document } from '../models/Document';
import { Note } from '../models/Note';
import { BaseController } from '../../common/controllers/BaseController';
import { AppDataSource } from '../../common/config/database';
import { NotFoundError, BadRequestError } from '../../common/middleware/errorHandler';
import { config } from '../../paperless/config/settings';

export class DocumentController extends BaseController<Document> {
  protected entityClass = Document;
  protected entityName = 'Document';

  /**
   * Get document preview
   */
  async preview(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    const document = await this.getDocumentById(id);

    const filePath = document.hasArchiveVersion ? document.archivePath : document.sourcePath;
    
    if (!filePath || !fs.existsSync(filePath)) {
      throw new NotFoundError('Document file not found');
    }

    ctx.type = document.mimeType;
    ctx.body = fs.createReadStream(filePath);
  }

  /**
   * Get document thumbnail
   */
  async thumbnail(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    const document = await this.getDocumentById(id);

    const thumbnailPath = document.thumbnailPath;
    
    if (!fs.existsSync(thumbnailPath)) {
      throw new NotFoundError('Thumbnail not found');
    }

    ctx.type = 'image/webp';
    ctx.body = fs.createReadStream(thumbnailPath);
  }

  /**
   * Download document
   */
  async download(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    const original = ctx.query.original === 'true';
    
    const document = await this.getDocumentById(id);

    const filePath = original || !document.hasArchiveVersion 
      ? document.sourcePath 
      : document.archivePath;
    
    if (!filePath || !fs.existsSync(filePath)) {
      throw new NotFoundError('Document file not found');
    }

    const filename = document.getPublicFilename({ archive: !original });
    
    ctx.type = document.mimeType;
    ctx.attachment(filename);
    ctx.body = fs.createReadStream(filePath);
  }

  /**
   * Get document metadata
   */
  async metadata(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    const document = await this.getDocumentById(id);

    // TODO: Implement full metadata extraction
    ctx.body = {
      original_checksum: document.checksum,
      original_size: fs.existsSync(document.sourcePath) 
        ? fs.statSync(document.sourcePath).size 
        : null,
      original_mime_type: document.mimeType,
      archive_checksum: document.archiveChecksum,
      archive_size: document.archivePath && fs.existsSync(document.archivePath)
        ? fs.statSync(document.archivePath).size
        : null,
      original_metadata: [],
      archive_metadata: [],
      has_archive_version: document.hasArchiveVersion,
    };
  }

  /**
   * Get document suggestions
   */
  async suggestions(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    const document = await this.getDocumentById(id);

    // TODO: Implement classifier-based suggestions
    ctx.body = {
      correspondents: [],
      document_types: [],
      storage_paths: [],
      tags: [],
      dates: [],
    };
  }

  /**
   * Get document notes
   */
  async getNotes(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    await this.getDocumentById(id);

    const noteRepository = AppDataSource.getRepository(Note);
    const notes = await noteRepository.find({
      where: { documentId: id },
      relations: ['user'],
      order: { created: 'DESC' },
    });

    ctx.body = notes;
  }

  /**
   * Add note to document
   */
  async addNote(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    await this.getDocumentById(id);

    const noteRepository = AppDataSource.getRepository(Note);
    const note = noteRepository.create({
      documentId: id,
      note: (ctx.request.body as { note: string }).note,
      // TODO: Get user from auth context
    });

    const saved = await noteRepository.save(note);
    ctx.status = 201;
    ctx.body = saved;
  }

  /**
   * Delete note from document
   */
  async deleteNote(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    const noteId = parseInt(ctx.params.noteId);

    const noteRepository = AppDataSource.getRepository(Note);
    const note = await noteRepository.findOne({
      where: { id: noteId, documentId: id },
    });

    if (!note) {
      throw new NotFoundError('Note not found');
    }

    await noteRepository.remove(note);
    ctx.status = 204;
  }

  /**
   * Post document (upload)
   */
  async postDocument(ctx: Context): Promise<void> {
    // TODO: Implement document upload and consumption
    ctx.body = {
      task_id: 'pending-implementation',
    };
  }

  /**
   * Bulk edit documents
   */
  async bulkEdit(ctx: Context): Promise<void> {
    // TODO: Implement bulk edit
    const body = ctx.request.body as {
      documents: number[];
      method: string;
      parameters: Record<string, unknown>;
    };
    
    ctx.body = {
      result: 'pending-implementation',
      affected: body.documents.length,
    };
  }

  /**
   * Bulk download documents
   */
  async bulkDownload(ctx: Context): Promise<void> {
    // TODO: Implement bulk download
    ctx.body = {
      task_id: 'pending-implementation',
    };
  }

  /**
   * Get selection data for documents
   */
  async selectionData(ctx: Context): Promise<void> {
    const body = ctx.request.body as { documents: number[] };
    
    // TODO: Implement selection data aggregation
    ctx.body = {
      selected_correspondents: [],
      selected_document_types: [],
      selected_storage_paths: [],
      selected_tags: [],
    };
  }

  /**
   * Chat/AI endpoint
   */
  async chat(ctx: Context): Promise<void> {
    // TODO: Implement AI chat functionality
    ctx.body = {
      response: 'AI chat functionality pending implementation',
    };
  }

  private async getDocumentById(id: number): Promise<Document> {
    if (isNaN(id)) {
      throw new BadRequestError('Invalid document ID');
    }

    const repository = this.getRepository();
    const document = await repository.findOne({
      where: { id },
      relations: ['correspondent', 'documentType', 'storagePath', 'tags'],
    });

    if (!document) {
      throw new NotFoundError('Document not found');
    }

    return document;
  }
}

export default DocumentController;
