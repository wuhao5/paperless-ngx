/**
 * Workflow routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { WorkflowController } from '../controllers/WorkflowController';

export const workflowRoutes = new Router();

const controller = new WorkflowController();

// List workflows
workflowRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get workflow
workflowRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create workflow
workflowRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update workflow
workflowRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Partial update workflow
workflowRoutes.patch('/:id', async (ctx: Context) => {
  await controller.partialUpdate(ctx);
});

// Delete workflow
workflowRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

export default workflowRoutes;
