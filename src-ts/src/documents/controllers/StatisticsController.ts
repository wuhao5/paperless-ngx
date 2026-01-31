/**
 * Statistics Controller
 */

import { Context } from 'koa';
import { AppDataSource } from '../../common/config/database';
import { Document } from '../models/Document';
import { Correspondent } from '../models/Correspondent';
import { Tag } from '../models/Tag';
import { DocumentType } from '../models/DocumentType';

export class StatisticsController {
  /**
   * Get application statistics
   */
  async get(ctx: Context): Promise<void> {
    const documentRepository = AppDataSource.getRepository(Document);
    const correspondentRepository = AppDataSource.getRepository(Correspondent);
    const tagRepository = AppDataSource.getRepository(Tag);
    const documentTypeRepository = AppDataSource.getRepository(DocumentType);

    const [
      documentsTotal,
      documentsInbox,
      correspondentsCount,
      tagsCount,
      documentTypesCount,
    ] = await Promise.all([
      documentRepository.count(),
      documentRepository.count(), // TODO: Filter by inbox tag
      correspondentRepository.count(),
      tagRepository.count(),
      documentTypeRepository.count(),
    ]);

    ctx.body = {
      documents_total: documentsTotal,
      documents_inbox: documentsInbox,
      correspondents_count: correspondentsCount,
      tags_count: tagsCount,
      document_types_count: documentTypesCount,
      character_count: 0, // TODO: Calculate from content
    };
  }
}

export default StatisticsController;
