/**
 * Workflow Controller
 */

import { Workflow } from '../models/Workflow';
import { BaseController } from '../../common/controllers/BaseController';

export class WorkflowController extends BaseController<Workflow> {
  protected entityClass = Workflow;
  protected entityName = 'Workflow';
}

export default WorkflowController;
