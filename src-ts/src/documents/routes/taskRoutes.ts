/**
 * Task routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { TaskController } from '../controllers/TaskController';

export const taskRoutes = new Router();

const controller = new TaskController();

// List tasks
taskRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get task
taskRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Acknowledge tasks
taskRoutes.post('/acknowledge', async (ctx: Context) => {
  await controller.acknowledge(ctx);
});

// Run task
taskRoutes.post('/run', async (ctx: Context) => {
  await controller.run(ctx);
});

export default taskRoutes;
