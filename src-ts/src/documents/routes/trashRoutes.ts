/**
 * Trash routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { TrashController } from '../controllers/TrashController';

export const trashRoutes = new Router();

const controller = new TrashController();

// List trashed documents
trashRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Restore document
trashRoutes.post('/restore', async (ctx: Context) => {
  await controller.restore(ctx);
});

// Empty trash
trashRoutes.post('/empty', async (ctx: Context) => {
  await controller.empty(ctx);
});

export default trashRoutes;
