/**
 * User Controller
 * Corresponds to paperless/views.py UserViewSet
 */

import { Context } from 'koa';
import { User } from '../models/User';
import { BaseController } from '../../common/controllers/BaseController';
import { ForbiddenError, NotFoundError } from '../../common/middleware/errorHandler';
import { AppDataSource } from '../../common/config/database';

export class UserController extends BaseController<User> {
  protected entityClass = User;
  protected entityName = 'User';

  /**
   * Create user with superuser check
   */
  async create(ctx: Context): Promise<void> {
    const body = ctx.request.body as { is_superuser?: boolean };
    // TODO: Get current user from auth context
    const currentUser = { isSuperuser: true }; // Placeholder

    if (!currentUser.isSuperuser && body.is_superuser === true) {
      throw new ForbiddenError('Superuser status can only be granted by a superuser');
    }

    await super.create(ctx);
  }

  /**
   * Update user with superuser check
   */
  async update(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    const body = ctx.request.body as { is_superuser?: boolean };
    // TODO: Get current user from auth context
    const currentUser = { isSuperuser: true }; // Placeholder

    const userToUpdate = await this.getRepository().findOne({ where: { id } });
    
    if (!userToUpdate) {
      throw new NotFoundError('User not found');
    }

    if (!currentUser.isSuperuser && userToUpdate.isSuperuser) {
      throw new ForbiddenError('Superusers can only be modified by other superusers');
    }

    if (!currentUser.isSuperuser && body.is_superuser !== undefined && body.is_superuser !== userToUpdate.isSuperuser) {
      throw new ForbiddenError('Superuser status can only be changed by a superuser');
    }

    await super.update(ctx);
  }

  /**
   * Deactivate TOTP for a user
   */
  async deactivateTotp(ctx: Context): Promise<void> {
    const id = parseInt(ctx.params.id);
    // TODO: Get current user from auth context
    const currentUser = { id: 1, isSuperuser: true }; // Placeholder

    if (!currentUser.isSuperuser && currentUser.id !== id) {
      throw new ForbiddenError('You do not have permission to deactivate TOTP for this user');
    }

    // TODO: Implement TOTP deactivation
    ctx.body = { success: true };
  }
}

export default UserController;
