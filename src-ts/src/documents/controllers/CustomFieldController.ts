/**
 * CustomField Controller
 */

import { CustomField } from '../models/CustomField';
import { BaseController } from '../../common/controllers/BaseController';

export class CustomFieldController extends BaseController<CustomField> {
  protected entityClass = CustomField;
  protected entityName = 'CustomField';
}

export default CustomFieldController;
