/**
 * Statistics routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { StatisticsController } from '../controllers/StatisticsController';

export const statisticsRoutes = new Router();

const controller = new StatisticsController();

// Get statistics
statisticsRoutes.get('/', async (ctx: Context) => {
  await controller.get(ctx);
});

export default statisticsRoutes;
