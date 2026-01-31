/**
 * Paperless-ngx Backend Application
 * TypeScript/Koa implementation
 */

import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import session from 'koa-session';

import { config } from './paperless/config/settings';
import { logger } from './common/utils/logger';
import { errorHandler } from './common/middleware/errorHandler';
import { requestLogger } from './common/middleware/requestLogger';

// Import routers
import { apiRouter } from './paperless/routes';

const app = new Koa();

// Application keys for session
app.keys = [config.secretKey];

// Middleware
app.use(errorHandler);
app.use(requestLogger);
app.use(cors());
app.use(bodyParser());
app.use(session({
  key: 'paperless:session',
  maxAge: 86400000, // 1 day
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
}, app));

// Routes
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`Paperless-ngx server running on port ${PORT}`);
  logger.info(`Environment: ${config.environment}`);
});

export default app;
