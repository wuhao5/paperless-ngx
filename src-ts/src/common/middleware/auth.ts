/**
 * Authentication middleware for Koa
 * 
 * Open Items:
 * - JWT token validation
 * - Session-based authentication
 * - OAuth integration (for social logins)
 * - TOTP/MFA support
 */

import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import { config } from '../../paperless/config/settings';
import { UnauthorizedError } from './errorHandler';
import { AppDataSource } from '../config/database';
import { User } from '../../paperless/models/User';

export interface AuthenticatedUser {
  id: number;
  username: string;
  email: string;
  isSuperuser: boolean;
  isStaff: boolean;
}

declare module 'koa' {
  interface Context {
    user?: AuthenticatedUser;
  }
}

/**
 * Extract token from Authorization header
 */
function extractToken(ctx: Context): string | null {
  const authHeader = ctx.headers.authorization;
  
  if (!authHeader) {
    return null;
  }

  // Bearer token
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Token (DRF style)
  if (authHeader.startsWith('Token ')) {
    return authHeader.substring(6);
  }

  return null;
}

/**
 * Authentication middleware
 * Validates JWT or session-based auth
 */
export async function authenticate(ctx: Context, next: Next): Promise<void> {
  const token = extractToken(ctx);
  
  if (token) {
    try {
      // Try JWT validation first
      const decoded = jwt.verify(token, config.secretKey) as { userId: number };
      
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: decoded.userId } });
      
      if (user && user.isActive) {
        ctx.user = {
          id: user.id,
          username: user.username,
          email: user.email,
          isSuperuser: user.isSuperuser,
          isStaff: user.isStaff,
        };
      }
    } catch {
      // Token validation failed, continue without user
    }
  }
  
  // Check session-based auth
  if (!ctx.user && ctx.session?.userId) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: ctx.session.userId } });
    
    if (user && user.isActive) {
      ctx.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        isSuperuser: user.isSuperuser,
        isStaff: user.isStaff,
      };
    }
  }

  await next();
}

/**
 * Require authentication middleware
 * Use after authenticate middleware
 */
export async function requireAuth(ctx: Context, next: Next): Promise<void> {
  if (!ctx.user) {
    throw new UnauthorizedError('Authentication required');
  }
  await next();
}

/**
 * Require superuser middleware
 */
export async function requireSuperuser(ctx: Context, next: Next): Promise<void> {
  if (!ctx.user) {
    throw new UnauthorizedError('Authentication required');
  }
  if (!ctx.user.isSuperuser) {
    throw new UnauthorizedError('Superuser access required');
  }
  await next();
}

/**
 * Generate JWT token for user
 */
export function generateToken(userId: number): string {
  return jwt.sign(
    { userId },
    config.secretKey,
    { expiresIn: '24h' }
  );
}

export default {
  authenticate,
  requireAuth,
  requireSuperuser,
  generateToken,
};
