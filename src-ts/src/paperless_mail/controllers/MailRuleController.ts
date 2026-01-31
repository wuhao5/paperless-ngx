/**
 * MailRule Controller
 */

import { MailRule } from '../models/MailRule';
import { BaseController } from '../../common/controllers/BaseController';

export class MailRuleController extends BaseController<MailRule> {
  protected entityClass = MailRule;
  protected entityName = 'MailRule';
}

export default MailRuleController;
