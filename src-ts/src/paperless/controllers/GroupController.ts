/**
 * Group Controller
 */

import { Group } from '../models/Group';
import { BaseController } from '../../common/controllers/BaseController';

export class GroupController extends BaseController<Group> {
  protected entityClass = Group;
  protected entityName = 'Group';
}

export default GroupController;
