/**
 * Search Controller
 */

import { Context } from 'koa';
import { AppDataSource } from '../../common/config/database';
import { Document } from '../models/Document';
import { Correspondent } from '../models/Correspondent';
import { Tag } from '../models/Tag';
import { DocumentType } from '../models/DocumentType';

export class SearchController {
  /**
   * Global search across all entities
   */
  async globalSearch(ctx: Context): Promise<void> {
    const query = ctx.query.query as string || '';
    
    if (!query) {
      ctx.body = {
        documents: [],
        correspondents: [],
        tags: [],
        document_types: [],
      };
      return;
    }

    // TODO: Implement full-text search with Whoosh equivalent
    // For now, basic LIKE search
    const documentRepository = AppDataSource.getRepository(Document);
    const correspondentRepository = AppDataSource.getRepository(Correspondent);
    const tagRepository = AppDataSource.getRepository(Tag);
    const documentTypeRepository = AppDataSource.getRepository(DocumentType);

    const [documents, correspondents, tags, documentTypes] = await Promise.all([
      documentRepository
        .createQueryBuilder('document')
        .where('document.title ILIKE :query', { query: `%${query}%` })
        .orWhere('document.content ILIKE :query', { query: `%${query}%` })
        .limit(10)
        .getMany(),
      correspondentRepository
        .createQueryBuilder('correspondent')
        .where('correspondent.name ILIKE :query', { query: `%${query}%` })
        .limit(5)
        .getMany(),
      tagRepository
        .createQueryBuilder('tag')
        .where('tag.name ILIKE :query', { query: `%${query}%` })
        .limit(5)
        .getMany(),
      documentTypeRepository
        .createQueryBuilder('documentType')
        .where('documentType.name ILIKE :query', { query: `%${query}%` })
        .limit(5)
        .getMany(),
    ]);

    ctx.body = {
      documents,
      correspondents,
      tags,
      document_types: documentTypes,
    };
  }

  /**
   * Autocomplete for search
   */
  async autocomplete(ctx: Context): Promise<void> {
    const query = ctx.query.term as string || '';
    
    if (!query || query.length < 2) {
      ctx.body = [];
      return;
    }

    // TODO: Implement proper autocomplete with index
    const documentRepository = AppDataSource.getRepository(Document);
    
    const documents = await documentRepository
      .createQueryBuilder('document')
      .where('document.title ILIKE :query', { query: `%${query}%` })
      .select(['document.id', 'document.title'])
      .limit(10)
      .getMany();

    ctx.body = documents.map(doc => doc.title);
  }
}

export default SearchController;
