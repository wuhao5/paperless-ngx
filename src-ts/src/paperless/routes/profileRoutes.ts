/**
 * Profile routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { ProfileController } from '../controllers/ProfileController';

export const profileRoutes = new Router();

const controller = new ProfileController();

// Get profile
profileRoutes.get('/', async (ctx: Context) => {
  await controller.get(ctx);
});

// Update profile
profileRoutes.patch('/', async (ctx: Context) => {
  await controller.update(ctx);
});

// Generate auth token
profileRoutes.post('/generate_auth_token', async (ctx: Context) => {
  await controller.generateAuthToken(ctx);
});

// Disconnect social account
profileRoutes.post('/disconnect_social_account', async (ctx: Context) => {
  await controller.disconnectSocialAccount(ctx);
});

// Get social account providers
profileRoutes.get('/social_account_providers', async (ctx: Context) => {
  await controller.socialAccountProviders(ctx);
});

// TOTP routes
profileRoutes.get('/totp', async (ctx: Context) => {
  await controller.getTotpSecret(ctx);
});

profileRoutes.post('/totp', async (ctx: Context) => {
  await controller.activateTotp(ctx);
});

profileRoutes.delete('/totp', async (ctx: Context) => {
  await controller.deactivateTotp(ctx);
});

export default profileRoutes;
