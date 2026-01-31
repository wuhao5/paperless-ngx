/**
 * Mail Rule routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { MailRuleController } from '../controllers/MailRuleController';

export const mailRuleRoutes = new Router();

const controller = new MailRuleController();

// List mail rules
mailRuleRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get mail rule
mailRuleRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create mail rule
mailRuleRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update mail rule
mailRuleRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Partial update mail rule
mailRuleRoutes.patch('/:id', async (ctx: Context) => {
  await controller.partialUpdate(ctx);
});

// Delete mail rule
mailRuleRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

export default mailRuleRoutes;
