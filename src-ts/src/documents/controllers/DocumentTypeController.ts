/**
 * DocumentType Controller
 */

import { DocumentType } from '../models/DocumentType';
import { BaseController } from '../../common/controllers/BaseController';

export class DocumentTypeController extends BaseController<DocumentType> {
  protected entityClass = DocumentType;
  protected entityName = 'DocumentType';
}

export default DocumentTypeController;
