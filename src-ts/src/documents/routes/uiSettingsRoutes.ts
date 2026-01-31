/**
 * UI Settings routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { UiSettingsController } from '../controllers/UiSettingsController';

export const uiSettingsRoutes = new Router();

const controller = new UiSettingsController();

// Get UI settings
uiSettingsRoutes.get('/', async (ctx: Context) => {
  await controller.get(ctx);
});

// Update UI settings
uiSettingsRoutes.post('/', async (ctx: Context) => {
  await controller.update(ctx);
});

export default uiSettingsRoutes;
