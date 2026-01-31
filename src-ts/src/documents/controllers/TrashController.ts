/**
 * Trash Controller
 */

import { Context } from 'koa';
import { AppDataSource } from '../../common/config/database';
import { Document } from '../models/Document';
import { NotFoundError } from '../../common/middleware/errorHandler';

export class TrashController {
  /**
   * List trashed documents
   */
  async list(ctx: Context): Promise<void> {
    const documentRepository = AppDataSource.getRepository(Document);
    
    const trashedDocuments = await documentRepository.find({
      where: { isDeleted: true },
      order: { deletedAt: 'DESC' },
    });

    ctx.body = {
      count: trashedDocuments.length,
      results: trashedDocuments,
    };
  }

  /**
   * Restore documents from trash
   */
  async restore(ctx: Context): Promise<void> {
    const body = ctx.request.body as { documents: number[] };
    
    const documentRepository = AppDataSource.getRepository(Document);
    
    await documentRepository.update(body.documents, {
      isDeleted: false,
      deletedAt: undefined,
    });

    ctx.body = {
      restored: body.documents.length,
    };
  }

  /**
   * Empty trash (permanently delete all trashed documents)
   */
  async empty(ctx: Context): Promise<void> {
    const documentRepository = AppDataSource.getRepository(Document);
    
    const result = await documentRepository.delete({ isDeleted: true });

    ctx.body = {
      deleted: result.affected || 0,
    };
  }
}

export default TrashController;
