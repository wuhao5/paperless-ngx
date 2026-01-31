/**
 * ShareLink routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { ShareLinkController } from '../controllers/ShareLinkController';

export const shareLinkRoutes = new Router();

const controller = new ShareLinkController();

// List share links
shareLinkRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get share link
shareLinkRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create share link
shareLinkRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update share link
shareLinkRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Delete share link
shareLinkRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

export default shareLinkRoutes;
