/**
 * Logs routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { LogsController } from '../controllers/LogsController';

export const logsRoutes = new Router();

const controller = new LogsController();

// List logs
logsRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get specific log
logsRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

export default logsRoutes;
