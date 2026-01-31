/**
 * Mail Account routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { MailAccountController } from '../controllers/MailAccountController';

export const mailAccountRoutes = new Router();

const controller = new MailAccountController();

// List mail accounts
mailAccountRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get mail account
mailAccountRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create mail account
mailAccountRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update mail account
mailAccountRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Partial update mail account
mailAccountRoutes.patch('/:id', async (ctx: Context) => {
  await controller.partialUpdate(ctx);
});

// Delete mail account
mailAccountRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

// Test mail account
mailAccountRoutes.post('/:id/test', async (ctx: Context) => {
  await controller.test(ctx);
});

export default mailAccountRoutes;
