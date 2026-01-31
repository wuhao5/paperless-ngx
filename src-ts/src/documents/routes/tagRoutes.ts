/**
 * Tag routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { TagController } from '../controllers/TagController';

export const tagRoutes = new Router();

const controller = new TagController();

// List tags
tagRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get tag
tagRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create tag
tagRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update tag
tagRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Partial update tag
tagRoutes.patch('/:id', async (ctx: Context) => {
  await controller.partialUpdate(ctx);
});

// Delete tag
tagRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

export default tagRoutes;
