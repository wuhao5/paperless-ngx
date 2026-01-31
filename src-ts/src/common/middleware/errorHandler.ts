/**
 * Error handler middleware for Koa
 */

import { Context, Next } from 'koa';
import { logger } from '../utils/logger';

export interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;
}

export class HttpError extends Error implements ApiError {
  status: number;
  code?: string;
  details?: unknown;

  constructor(status: number, message: string, code?: string, details?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    this.name = 'HttpError';
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Resource not found') {
    super(404, message, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad request', details?: unknown) {
    super(400, message, 'BAD_REQUEST', details);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(401, message, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    super(403, message, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

export class ValidationError extends HttpError {
  constructor(message = 'Validation failed', details?: unknown) {
    super(422, message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
    super(409, message, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

export class InternalServerError extends HttpError {
  constructor(message = 'Internal server error') {
    super(500, message, 'INTERNAL_ERROR');
    this.name = 'InternalServerError';
  }
}

export async function errorHandler(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (err) {
    const error = err as ApiError;
    
    // Log the error
    if (error.status && error.status < 500) {
      logger.warn(`${error.status} - ${error.message}`);
    } else {
      logger.error('Unhandled error:', error);
    }

    // Set response
    ctx.status = error.status || 500;
    const responseBody: { message: string; code: string; details?: unknown } = {
      message: error.message || 'Internal server error',
      code: error.code || 'INTERNAL_ERROR',
    };
    if (error.details) {
      responseBody.details = error.details;
    }
    ctx.body = {
      error: responseBody,
    };
  }
}

export default errorHandler;
