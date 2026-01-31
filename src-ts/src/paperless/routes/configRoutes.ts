/**
 * Config routes (Application Configuration)
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { ConfigController } from '../controllers/ConfigController';

export const configRoutes = new Router();

const controller = new ConfigController();

// List config (singleton, returns array with one item)
configRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get config
configRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Update config
configRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Partial update config
configRoutes.patch('/:id', async (ctx: Context) => {
  await controller.partialUpdate(ctx);
});

export default configRoutes;
