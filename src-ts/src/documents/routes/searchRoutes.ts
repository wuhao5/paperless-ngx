/**
 * Search routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { SearchController } from '../controllers/SearchController';

export const searchRoutes = new Router();

const controller = new SearchController();

// Global search
searchRoutes.get('/', async (ctx: Context) => {
  await controller.globalSearch(ctx);
});

// Autocomplete
searchRoutes.get('/autocomplete', async (ctx: Context) => {
  await controller.autocomplete(ctx);
});

export default searchRoutes;
