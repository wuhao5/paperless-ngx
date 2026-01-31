/**
 * Correspondent routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { CorrespondentController } from '../controllers/CorrespondentController';

export const correspondentRoutes = new Router();

const controller = new CorrespondentController();

// List correspondents
correspondentRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get correspondent
correspondentRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create correspondent
correspondentRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update correspondent
correspondentRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Partial update correspondent
correspondentRoutes.patch('/:id', async (ctx: Context) => {
  await controller.partialUpdate(ctx);
});

// Delete correspondent
correspondentRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

export default correspondentRoutes;
