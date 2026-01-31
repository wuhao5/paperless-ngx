/**
 * StoragePath Controller
 */

import { Context } from 'koa';
import { StoragePath } from '../models/StoragePath';
import { BaseController } from '../../common/controllers/BaseController';

export class StoragePathController extends BaseController<StoragePath> {
  protected entityClass = StoragePath;
  protected entityName = 'StoragePath';

  /**
   * Test a storage path template
   */
  async test(ctx: Context): Promise<void> {
    const body = ctx.request.body as { path: string };
    
    // TODO: Implement path template testing
    ctx.body = {
      path: body.path,
      resolved: body.path,
      is_valid: true,
    };
  }
}

export default StoragePathController;
