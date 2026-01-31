/**
 * Task Controller
 */

import { Context } from 'koa';
import { PaperlessTask } from '../models/PaperlessTask';
import { BaseController } from '../../common/controllers/BaseController';
import { AppDataSource } from '../../common/config/database';

export class TaskController extends BaseController<PaperlessTask> {
  protected entityClass = PaperlessTask;
  protected entityName = 'Task';

  /**
   * Acknowledge tasks
   */
  async acknowledge(ctx: Context): Promise<void> {
    const body = ctx.request.body as { tasks: number[] };
    
    const repository = this.getRepository();
    await repository.update(body.tasks, { acknowledged: true });

    ctx.body = {
      acknowledged: body.tasks.length,
    };
  }

  /**
   * Run a specific task
   */
  async run(ctx: Context): Promise<void> {
    const body = ctx.request.body as { task: string };
    
    // TODO: Implement task execution (similar to Celery tasks)
    ctx.body = {
      task_id: 'pending-implementation',
      task_name: body.task,
    };
  }
}

export default TaskController;
