/**
 * Main API router for Paperless-ngx
 * Corresponds to paperless/urls.py
 */

import Router from '@koa/router';

// Import sub-routers
import { documentRoutes } from '../../documents/routes';
import { correspondentRoutes } from '../../documents/routes/correspondentRoutes';
import { documentTypeRoutes } from '../../documents/routes/documentTypeRoutes';
import { tagRoutes } from '../../documents/routes/tagRoutes';
import { storagePathRoutes } from '../../documents/routes/storagePathRoutes';
import { savedViewRoutes } from '../../documents/routes/savedViewRoutes';
import { taskRoutes } from '../../documents/routes/taskRoutes';
import { shareLinkRoutes } from '../../documents/routes/shareLinkRoutes';
import { customFieldRoutes } from '../../documents/routes/customFieldRoutes';
import { workflowRoutes } from '../../documents/routes/workflowRoutes';
import { userRoutes } from './userRoutes';
import { groupRoutes } from './groupRoutes';
import { profileRoutes } from './profileRoutes';
import { configRoutes } from './configRoutes';
import { mailAccountRoutes } from '../../paperless_mail/routes/mailAccountRoutes';
import { mailRuleRoutes } from '../../paperless_mail/routes/mailRuleRoutes';
import { statusRoutes } from './statusRoutes';
import { searchRoutes } from '../../documents/routes/searchRoutes';
import { statisticsRoutes } from '../../documents/routes/statisticsRoutes';
import { trashRoutes } from '../../documents/routes/trashRoutes';
import { uiSettingsRoutes } from '../../documents/routes/uiSettingsRoutes';
import { logsRoutes } from '../../documents/routes/logsRoutes';

export const apiRouter = new Router({
  prefix: '/api',
});

// Auth routes (placeholder - will need passport integration)
apiRouter.use('/auth', authPlaceholder().routes());

// Search routes
apiRouter.use('/search', searchRoutes.routes(), searchRoutes.allowedMethods());

// Statistics
apiRouter.use('/statistics', statisticsRoutes.routes(), statisticsRoutes.allowedMethods());

// Documents
apiRouter.use('/documents', documentRoutes.routes(), documentRoutes.allowedMethods());

// Correspondents
apiRouter.use('/correspondents', correspondentRoutes.routes(), correspondentRoutes.allowedMethods());

// Document Types
apiRouter.use('/document_types', documentTypeRoutes.routes(), documentTypeRoutes.allowedMethods());

// Tags
apiRouter.use('/tags', tagRoutes.routes(), tagRoutes.allowedMethods());

// Storage Paths
apiRouter.use('/storage_paths', storagePathRoutes.routes(), storagePathRoutes.allowedMethods());

// Saved Views
apiRouter.use('/saved_views', savedViewRoutes.routes(), savedViewRoutes.allowedMethods());

// Tasks
apiRouter.use('/tasks', taskRoutes.routes(), taskRoutes.allowedMethods());

// Share Links
apiRouter.use('/share_links', shareLinkRoutes.routes(), shareLinkRoutes.allowedMethods());

// Custom Fields
apiRouter.use('/custom_fields', customFieldRoutes.routes(), customFieldRoutes.allowedMethods());

// Workflows
apiRouter.use('/workflows', workflowRoutes.routes(), workflowRoutes.allowedMethods());

// Users
apiRouter.use('/users', userRoutes.routes(), userRoutes.allowedMethods());

// Groups
apiRouter.use('/groups', groupRoutes.routes(), groupRoutes.allowedMethods());

// Profile
apiRouter.use('/profile', profileRoutes.routes(), profileRoutes.allowedMethods());

// Config
apiRouter.use('/config', configRoutes.routes(), configRoutes.allowedMethods());

// Mail accounts
apiRouter.use('/mail_accounts', mailAccountRoutes.routes(), mailAccountRoutes.allowedMethods());

// Mail rules
apiRouter.use('/mail_rules', mailRuleRoutes.routes(), mailRuleRoutes.allowedMethods());

// Status
apiRouter.use('/status', statusRoutes.routes(), statusRoutes.allowedMethods());

// Trash
apiRouter.use('/trash', trashRoutes.routes(), trashRoutes.allowedMethods());

// UI Settings
apiRouter.use('/ui_settings', uiSettingsRoutes.routes(), uiSettingsRoutes.allowedMethods());

// Logs
apiRouter.use('/logs', logsRoutes.routes(), logsRoutes.allowedMethods());

// Auth placeholder - to be replaced with proper passport integration
function authPlaceholder(): Router {
  const router = new Router();
  // TODO: Implement authentication routes
  return router;
}

export default apiRouter;
