/**
 * StoragePath routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { StoragePathController } from '../controllers/StoragePathController';

export const storagePathRoutes = new Router();

const controller = new StoragePathController();

// List storage paths
storagePathRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get storage path
storagePathRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create storage path
storagePathRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update storage path
storagePathRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Partial update storage path
storagePathRoutes.patch('/:id', async (ctx: Context) => {
  await controller.partialUpdate(ctx);
});

// Delete storage path
storagePathRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

// Test storage path
storagePathRoutes.post('/test', async (ctx: Context) => {
  await controller.test(ctx);
});

export default storagePathRoutes;
