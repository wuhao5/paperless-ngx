/**
 * UiSettings Controller
 */

import { Context } from 'koa';
import { AppDataSource } from '../../common/config/database';
import { UiSettings } from '../models/UiSettings';

export class UiSettingsController {
  /**
   * Get UI settings for current user
   */
  async get(ctx: Context): Promise<void> {
    // TODO: Get user from auth context
    const userId = 1; // Placeholder
    
    const repository = AppDataSource.getRepository(UiSettings);
    let settings = await repository.findOne({
      where: { userId },
    });

    if (!settings) {
      settings = repository.create({
        userId,
        settings: {},
      });
    }

    ctx.body = settings.settings;
  }

  /**
   * Update UI settings for current user
   */
  async update(ctx: Context): Promise<void> {
    // TODO: Get user from auth context
    const userId = 1; // Placeholder
    const body = ctx.request.body as { settings: Record<string, unknown> };
    
    const repository = AppDataSource.getRepository(UiSettings);
    let settings = await repository.findOne({
      where: { userId },
    });

    if (!settings) {
      settings = repository.create({
        userId,
        settings: body.settings,
      });
    } else {
      settings.settings = { ...settings.settings, ...body.settings };
    }

    await repository.save(settings);
    ctx.body = settings.settings;
  }
}

export default UiSettingsController;
