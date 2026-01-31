/**
 * Config Controller (Application Configuration)
 * Corresponds to paperless/views.py ApplicationConfigurationViewSet
 */

import { Context } from 'koa';
import { ApplicationConfiguration } from '../models/ApplicationConfiguration';
import { BaseController } from '../../common/controllers/BaseController';

export class ConfigController extends BaseController<ApplicationConfiguration> {
  protected entityClass = ApplicationConfiguration;
  protected entityName = 'ApplicationConfiguration';

  /**
   * List config (returns singleton)
   */
  async list(ctx: Context): Promise<void> {
    const repository = this.getRepository();
    let config = await repository.findOne({ where: { id: 1 } });

    if (!config) {
      config = repository.create({});
      await repository.save(config);
    }

    ctx.body = {
      count: 1,
      results: [config],
    };
  }

  /**
   * Create is not allowed for singleton
   */
  async create(ctx: Context): Promise<void> {
    ctx.status = 405;
    ctx.body = { error: 'Method not allowed' };
  }

  /**
   * Delete is not allowed for singleton
   */
  async delete(ctx: Context): Promise<void> {
    ctx.status = 405;
    ctx.body = { error: 'Method not allowed' };
  }
}

export default ConfigController;
