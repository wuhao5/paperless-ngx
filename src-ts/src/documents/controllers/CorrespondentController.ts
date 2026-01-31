/**
 * Correspondent Controller
 */

import { Correspondent } from '../models/Correspondent';
import { BaseController } from '../../common/controllers/BaseController';

export class CorrespondentController extends BaseController<Correspondent> {
  protected entityClass = Correspondent;
  protected entityName = 'Correspondent';
}

export default CorrespondentController;
