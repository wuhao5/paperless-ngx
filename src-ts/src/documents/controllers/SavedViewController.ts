/**
 * SavedView Controller
 */

import { SavedView } from '../models/SavedView';
import { BaseController } from '../../common/controllers/BaseController';

export class SavedViewController extends BaseController<SavedView> {
  protected entityClass = SavedView;
  protected entityName = 'SavedView';
}

export default SavedViewController;
