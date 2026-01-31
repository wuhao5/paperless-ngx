/**
 * DocumentType routes
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { DocumentTypeController } from '../controllers/DocumentTypeController';

export const documentTypeRoutes = new Router();

const controller = new DocumentTypeController();

// List document types
documentTypeRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get document type
documentTypeRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create document type
documentTypeRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update document type
documentTypeRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Partial update document type
documentTypeRoutes.patch('/:id', async (ctx: Context) => {
  await controller.partialUpdate(ctx);
});

// Delete document type
documentTypeRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

export default documentTypeRoutes;
