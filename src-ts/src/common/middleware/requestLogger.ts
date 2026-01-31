/**
 * Request logger middleware for Koa
 */

import { Context, Next } from 'koa';
import { logger } from '../utils/logger';

export async function requestLogger(ctx: Context, next: Next): Promise<void> {
  const start = Date.now();
  
  await next();
  
  const ms = Date.now() - start;
  const logLevel = ctx.status >= 400 ? 'warn' : 'info';
  
  logger[logLevel](
    `${ctx.method} ${ctx.url} - ${ctx.status} - ${ms}ms`
  );
}

export default requestLogger;
