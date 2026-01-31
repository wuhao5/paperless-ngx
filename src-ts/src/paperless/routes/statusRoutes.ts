/**
 * Status routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { StatusController } from '../controllers/StatusController';

export const statusRoutes = new Router();

const controller = new StatusController();

// Get system status
statusRoutes.get('/', async (ctx: Context) => {
  await controller.get(ctx);
});

export default statusRoutes;
