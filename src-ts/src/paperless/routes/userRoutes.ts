/**
 * User routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { UserController } from '../controllers/UserController';

export const userRoutes = new Router();

const controller = new UserController();

// List users
userRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get user
userRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create user
userRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update user
userRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Partial update user
userRoutes.patch('/:id', async (ctx: Context) => {
  await controller.partialUpdate(ctx);
});

// Delete user
userRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

// Deactivate TOTP
userRoutes.post('/:id/deactivate_totp', async (ctx: Context) => {
  await controller.deactivateTotp(ctx);
});

export default userRoutes;
