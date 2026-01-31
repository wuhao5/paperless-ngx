/**
 * Document routes
 * Corresponds to documents/views.py UnifiedSearchViewSet
 */

import Router from '@koa/router';
import { Context } from 'koa';
import { DocumentController } from '../controllers/DocumentController';

export const documentRoutes = new Router();

const controller = new DocumentController();

// List documents
documentRoutes.get('/', async (ctx: Context) => {
  await controller.list(ctx);
});

// Get document
documentRoutes.get('/:id', async (ctx: Context) => {
  await controller.get(ctx);
});

// Create document (post document)
documentRoutes.post('/', async (ctx: Context) => {
  await controller.create(ctx);
});

// Update document
documentRoutes.put('/:id', async (ctx: Context) => {
  await controller.update(ctx);
});

// Partial update document
documentRoutes.patch('/:id', async (ctx: Context) => {
  await controller.partialUpdate(ctx);
});

// Delete document
documentRoutes.delete('/:id', async (ctx: Context) => {
  await controller.delete(ctx);
});

// Document specific actions
documentRoutes.get('/:id/preview', async (ctx: Context) => {
  await controller.preview(ctx);
});

documentRoutes.get('/:id/thumb', async (ctx: Context) => {
  await controller.thumbnail(ctx);
});

documentRoutes.get('/:id/download', async (ctx: Context) => {
  await controller.download(ctx);
});

documentRoutes.get('/:id/metadata', async (ctx: Context) => {
  await controller.metadata(ctx);
});

documentRoutes.get('/:id/suggestions', async (ctx: Context) => {
  await controller.suggestions(ctx);
});

documentRoutes.get('/:id/notes', async (ctx: Context) => {
  await controller.getNotes(ctx);
});

documentRoutes.post('/:id/notes', async (ctx: Context) => {
  await controller.addNote(ctx);
});

documentRoutes.delete('/:id/notes/:noteId', async (ctx: Context) => {
  await controller.deleteNote(ctx);
});

// Bulk operations
documentRoutes.post('/post_document', async (ctx: Context) => {
  await controller.postDocument(ctx);
});

documentRoutes.post('/bulk_edit', async (ctx: Context) => {
  await controller.bulkEdit(ctx);
});

documentRoutes.post('/bulk_download', async (ctx: Context) => {
  await controller.bulkDownload(ctx);
});

documentRoutes.post('/selection_data', async (ctx: Context) => {
  await controller.selectionData(ctx);
});

// Chat/AI endpoint
documentRoutes.post('/chat', async (ctx: Context) => {
  await controller.chat(ctx);
});

export default documentRoutes;
