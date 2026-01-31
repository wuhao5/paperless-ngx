/**
 * SavedView routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { SavedViewController } from '../controllers/SavedViewController';

export const savedViewRoutes = new Router();

const controller = new SavedViewController();

// List saved views
savedViewRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get saved view
savedViewRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create saved view
savedViewRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update saved view
savedViewRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Partial update saved view
savedViewRoutes.patch('/:id', async (ctx: Context) => {
  await controller.partialUpdate(ctx);
});

// Delete saved view
savedViewRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

export default savedViewRoutes;
