/**
 * Tag Controller
 */

import { Tag } from '../models/Tag';
import { BaseController } from '../../common/controllers/BaseController';

export class TagController extends BaseController<Tag> {
  protected entityClass = Tag;
  protected entityName = 'Tag';
}

export default TagController;
