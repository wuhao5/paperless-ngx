/**
 * Group routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { GroupController } from '../controllers/GroupController';

export const groupRoutes = new Router();

const controller = new GroupController();

// List groups
groupRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get group
groupRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create group
groupRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update group
groupRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Partial update group
groupRoutes.patch('/:id', async (ctx: Context) => {
  await controller.partialUpdate(ctx);
});

// Delete group
groupRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

export default groupRoutes;
