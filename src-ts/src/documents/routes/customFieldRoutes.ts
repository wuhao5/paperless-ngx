/**
 * CustomField routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { CustomFieldController } from '../controllers/CustomFieldController';

export const customFieldRoutes = new Router();

const controller = new CustomFieldController();

// List custom fields
customFieldRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get custom field
customFieldRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create custom field
customFieldRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update custom field
customFieldRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Delete custom field
customFieldRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

export default customFieldRoutes;
